<template>
  <div class="items-center justify-center min-h-screen pt-10">
    <div v-show="!isLoading" class="">
      <div v-if="documents.length == 0" class="flex flex-col items-center">
        <p class="mb-4">
          You have no documents for now. upload adocument to start
        </p>
        <button
          @click="$router.push('/add-doc')"
          class="px-6 py-3 rounded-lg bg-blue-600 text-white"
        >
          Add document
        </button>
      </div>

      <div v-else class="w-full xl:w-1/2 xl:mx-auto px-8">
        <FoldersList class="mb-10" :folders="folders" />

        <h2 v-show="documents.length > 0" class="mb-6 text-2xl font-bold">
          Documents
        </h2>
        <DocumentList :documents="documents" />
      </div>
    </div>

    <Loader v-show="isLoading" class="mx-auto" />

    <SideButtons @showPopup="showPopupfunc" />

    <NewFolderForm v-if="showPopup" @hidePopup="hidePopupfunc" />
  </div>
</template>

<script>
import UploadButton from '~/components/UploadButton.vue'
import DocumentList from '~/components/DocumentList.vue'
import Loader from '~/components/Loader.vue'
import Folder from '~/components/Folder.vue'
import SideButtons from '~/components/SideButtons.vue'
import NewFolderForm from '~/components/NewFolderForm.vue'
import FoldersList from '~/components/FoldersList.vue'

export default {
  name: 'IndexPage',

  components: {
    UploadButton,
    DocumentList,
    Loader,
    Folder,
    SideButtons,
    NewFolderForm,
    FoldersList,
  },
  middleware: 'auth',

  data() {
    return {
      isLoading: true,
      showPopup: false,
    }
  },

  computed: {
    documents() {
      return this.$store.getters['documents/getNoFolderDocuments']
    },

    folders() {
      return this.$store.getters['folders/getFolders']
    },
  },

  methods: {
    showPopupfunc() {
      this.showPopup = true
    },
    hidePopupfunc() {
      this.showPopup = false
    },
  },

  async created() {
    await this.$store.dispatch('documents/fetchFolderlessDocuments')
    await this.$store.dispatch('folders/fetchFolders')
    this.isLoading = false
  },
}
</script>
