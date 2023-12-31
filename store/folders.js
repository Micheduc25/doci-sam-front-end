import swal from 'sweetalert'

export const state = () => ({
  folders: [],
})

export const getters = {
  getFolders(state) {
    return state.folders
  },
}

export const mutations = {
  setFolders(state, folders) {
    state.folders = folders
  },

  addFolder(state, folder) {
    state.folders.unshift(folder)
  },
}

export const actions = {
  async fetchFolders({ commit }) {
    try {
      const res = await this.$axios.get('/folders/')
      commit('setFolders', res.data)
    } catch (err) {
      // console.log(err.response.data.error)

      swal({ timer: 2500, text: 'Failed to load folders' })
    }
  },

  async fetchFolder({ commit }, id) {
    try {
      const res = await this.$axios.get(`/folders/${id}/`)
      return res.data
    } catch (err) {
      //   console.log(err.response.data.error)

      swal({ timer: 2500, text: 'Failed to load folders' })
    }
  },

  async createFolder({ state, commit }, payload) {
    try {
      const res = await this.$axios.post('/folders/', payload)
      commit('addFolder', res.data)
      return res.data
    } catch (err) {
      if (err.response.data.error) {
        console.log(err.response.data.error)

        swal(err.response.data.error.toString())
      }
    }
  },

  async fetchFolderDocuments({ commit }, folderId) {
    try {
      const res = await this.$axios.get(`/folders/${folderId}/documents/`)
      return res.data
    } catch (err) {
      swal({ timer: 2500, text: 'Failed to load folder documents' })
    }
  },

  async fetchSubFolders({ commit }, folderId) {
    try {
      const res = await this.$axios.get(`/folders/${folderId}/subfolders/`)

      return res.data
    } catch (err) {
      swal({ timer: 2500, text: 'Failed to load sub folder ' })
    }
  },
  async fetchPublicFolders({ commit }) {
    try {
      const res = await this.$axios.get(`/folders/public/`)

      return res.data
    } catch (err) {
      swal({ timer: 2500, text: 'Failed to load public folders ' })
    }
  },
}
