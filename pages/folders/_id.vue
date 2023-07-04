<template>
  <div>
    <div v-if="!isLoading">
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
      </div>

      <section class="w-full lg:w-3/4 2xl:w-1/2 mx-auto px-8 lg:px-0">
        <h2 v-show="subfolders.length > 0" class="mb-6 text-2xl font-bold">
          Folders
        </h2>

        <FoldersList class="mb-10" :folders="subfolders" />

        <h2 v-show="documents.length > 0" class="mb-6 text-2xl font-bold">
          Documents
        </h2>
        <DocumentList class="mb-12" :documents="documents" />
      </section>

      <SideButtons
        v-if="folder.creator.id == $auth.user.id"
        :show-add-folder="folderHistory.length < 10"
        @showPopup="showPopupfunc"
      />

      <NewFolderForm
        v-if="showPopup"
        @hidePopup="hidePopupfunc"
        @onCompleted="reloadFolders()"
        :parent="folder"
      />
    </div>

    <div v-else class="flex items-center justify-center"><Loader /></div>
  </div>
</template>

<script>
import { buildFolderHistory } from '../../utils/helpers'
import NewFolderForm from '@/components/NewFolderForm.vue'
export default {
  middleware: 'auth',
  data() {
    return {
      documents: [],
      subfolders: [],
      folder: null,
      isLoading: true,
      showPopup: false,
    }
  },
  components: {
    NewFolderForm,
  },
  computed: {
    folderHistory() {
      return !this.folder ? [] : buildFolderHistory(this.folder)
    },
  },
  methods: {
    showPopupfunc() {
      this.showPopup = true
    },
    hidePopupfunc() {
      this.showPopup = false
    },

    async reloadFolders() {
      console.log('reloading folders')
      const folderId = this.$route.params.id
      this.subfolders = await this.$store.dispatch(
        'folders/fetchSubFolders',
        folderId
      )
    },

    async reloadDocuments() {
      const folderId = this.$route.params.id
      this.documents = await this.$store.dispatch(
        'folders/fetchFolderDocuments',
        folderId
      )
    },
  },
  async created() {
    const folderId = this.$route.params.id

    await this.reloadDocuments()

    await this.reloadFolders()
    this.folder = await this.$store.dispatch('folders/fetchFolder', folderId)

    this.isLoading = false
  },
}
</script>
