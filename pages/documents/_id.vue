<template>
  <div class="min-h-screen">
    <div v-if="!isLoading" class="px-4">
      <h1 class="mb-4 font-bold text-2xl">
        Document Title: {{ this.currentDocument.title }}
      </h1>

      <p class="">
        {{ this.currentDocument.description }}
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
import { getSHA256HashFromUrl } from '~/utils/signatures'

export default {
  middleware: 'auth',
  data() {
    return {
      currentDocument: null,
      hash: null,
      isLoading: true,
    }
  },
  async created() {
    console.log(this.$route.query.isPublic)
    this.currentDocument = await this.$store.dispatch(
      'documents/fetchDocument',
      { id: this.$route.params.id, public: this.$route.query.isPublic }
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
  components: { Loader },
}
</script>
