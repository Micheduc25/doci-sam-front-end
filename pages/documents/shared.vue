<template>
  <div class="items-center justify-center min-h-screen pt-10">
    <div v-show="!isLoading" class="">
      <div v-if="documents.length == 0" class="flex flex-col items-center">
        <h1 class="mb-6 text-3xl font-bold">Shared documents</h1>
        <p class="mb-4">You have no documents shared with you for now.</p>
      </div>

      <div v-else class="w-1/2 mx-auto">
        <DocumentList :documents="documents" />
      </div>
    </div>

    <Loader v-show="isLoading" class="mx-auto" />
  </div>
</template>

<script>
import UploadButton from '~/components/UploadButton.vue'
import DocumentList from '~/components/DocumentList.vue'
import Loader from '~/components/Loader.vue'

export default {
  name: 'SharedDocumentsPage',

  components: { UploadButton, DocumentList, Loader },
  middleware: 'auth',

  data() {
    return {
      isLoading: true,
    }
  },

  computed: {
    documents() {
      return this.$store.getters['documents/getSharedDocuments']
    },
  },

  created() {
    this.$store.dispatch('documents/fetchSharedDocuments').then((e) => {
      this.isLoading = false
    })
  },
}
</script>
