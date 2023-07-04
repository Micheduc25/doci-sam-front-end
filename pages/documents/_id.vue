<template>
  <div class="min-h-screen">
    <div v-if="!isLoading" style="width: fit-content;" class="px-4 mx-auto">
      <div class="p-4">
        <nuxt-link to="/">Home</nuxt-link>
        <span
          v-for="(folder, index) in folderHistory"
          :key="`${folder.name}${folder.id}`"
        >
          <span>/</span>
          <nuxt-link class="underline" :to="`/folders/${folder.id}`">{{
            folder.name
          }}</nuxt-link>
        </span>
        <span>/{{ currentDocument.title }}</span>
      </div>
      <section class="py-6 bg-gray-100">
        <h1 class="mb-4 font-bold text-2xl">
          Document Title: {{ this.currentDocument.title }}
        </h1>

        <p class="">
          {{ this.currentDocument.description }}
        </p>
      </section>

      <p class="mb-8">
        <DownloadButton :url="currentDocument.file" />
      </p>

      <p v-if="currentDocument.signature" class="pt-4">
        <div class="font-bold text-xl mb-4"><strong>Signature</strong></div>
        <div style="width:max-content" class="rounded-lg shadow-xl border border-gray-200 p-4 flex items-center mb-4">
          <span class="font-bold text-xl">{{ currentDocument.signature }}</span>
        </div>

        <div class="flex justify-between">
          <button @click="copyToClipboard" class="bg-blue-500 rounded-lg p-8 py-3 shadow-xl text-white ">{{isSignatureCopied?"Signature Copied!":"Copy Signature"}}</button>
          <button @click="downloadSignatureTextFile" class="bg-blue-500 rounded-lg p-8 py-3 shadow-xl text-white ">Download Signature</button>
        </div>
      </p>
    </div>

    <div v-else class="flex justify-center">
      <Loader />
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import Loader from '~/components/Loader.vue'
import DownloadButton from '~/components/DownloadButton.vue'
import { getSHA256HashFromUrl } from '~/utils/signatures'
import { buildFolderHistory } from '~/utils/helpers'

export default {
  middleware: 'auth',
  data() {
    return {
      currentDocument: null,
      hash: null,
      isLoading: true,
      isSignatureCopied: false,
    }
  },

  computed:{

    folderHistory() {
      return !this.currentDocument.folder?[]:  buildFolderHistory(this.currentDocument.folder)
    },
  },


  methods:{
     copyToClipboard() {

      navigator.clipboard.writeText(this.currentDocument.signature)
      .then(() => {
        this.isSignatureCopied = true;
      })
      .catch((error) => {
        console.error('Unable to copy text to clipboard:', error);
      });
  },

   downloadSignatureTextFile() {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.currentDocument.signature));
      element.setAttribute('download', this.currentDocument.title+'_signature.txt');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  },
  async created() {
    const isShared = this.$route.query.isShared
    const isPublic = this.$route.query.isPublic

    this.currentDocument = await this.$store.dispatch(
      isShared == 'true'
        ? 'documents/fetchSharedDocument'
        : isPublic == 'true'
        ? 'documents/fetchPublicDocument'
        : 'documents/fetchDocument',
      this.$route.params.id
    )
    if (this.currentDocument == null) return
    this.hash = await getSHA256HashFromUrl(this.currentDocument.file)
    const isAuthenticDoc = await this.$store.dispatch(
      'documents/verifyDocument',
      { document_id: this.currentDocument.id, signature: this.hash }
    )
    if (isAuthenticDoc) {
      swal({ icon: 'success', text: 'This document is authentic!' })
    } else {
      swal({
        icon: 'error',
        text: 'This document is not authentic be careful!',
      })
    }
    this.isLoading = false
  },
  components: { Loader, DownloadButton },
}
</script>
