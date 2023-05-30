<template>
  <div class="items-center justify-center min-h-screen pt-10">
    <div v-show="!isLoading" class="">
      <div v-if="documents.length == 0" class="flex flex-col items-center">
        <h1 class="mb-6 text-3xl font-bold">Public documents</h1>
        <p class="mb-4">
          There are no public documents for now. upload a document to start
        </p>
        <button
          @click="$router.push('/add-doc')"
          class="px-6 py-3 rounded-lg bg-blue-600 text-white"
        >
          Add document
        </button>
      </div>

      <div v-else class="w-1/2 mx-auto">
        <DocumentList :is-public="true" :documents="documents" />
      </div>
    </div>

    <Loader v-show="isLoading" class="mx-auto" />

    <nuxt-link
      to="/add-doc"
      title="Add document"
      class="w-24 h-24 rounded-full flex items-center justify-center bg-blue-500 text-white text-3xl font-bold fixed bottom-20 right-20 shadow-xl"
      >+</nuxt-link
    >
  </div>
</template>

<script>
import UploadButton from '~/components/UploadButton.vue'
import DocumentList from '~/components/DocumentList.vue'
import Loader from '~/components/Loader.vue'

export default {
  name: 'PublicDocumentsPage',

  components: { UploadButton, DocumentList, Loader },
  middleware: 'auth',

  data() {
    return {
      isLoading: true,
    }
  },

  computed: {
    documents() {
      return this.$store.getters['documents/getPublicDocuments']
    },
  },

  created() {
    this.$store.dispatch('documents/fetchPublicDocuments').then((e) => {
      this.isLoading = false
    })
  },
}
</script>
