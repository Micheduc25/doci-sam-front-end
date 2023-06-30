import swal from 'sweetalert'
import { debounce } from '@/utils/helpers'

export const state = () => ({
  documents: [],
  publicDocuments: [],
  sharedDocuments: [],
  searchResults: [],
})

export const getters = {
  getDocuments(state) {
    return state.documents
  },

  getPublicDocuments(state) {
    return state.publicDocuments
  },
  getSharedDocuments(state) {
    return state.sharedDocuments
  },

  getSearchResults(state) {
    return state.searchResults
  },
}

export const mutations = {
  setdocuments(state, docs) {
    state.documents = docs
  },
  setpublicdocuments(state, docs) {
    state.publicDocuments = docs
  },
  setshareddocuments(state, docs) {
    state.sharedDocuments = docs
  },

  adddocument(state, newDoc) {
    state.documents = state.documents.unshift(newDoc)
  },

  SET_SEARCH_RESULTS(state, searchResults) {
    state.searchResults = searchResults
  },
}

export const actions = {
  async fetchDocuments({ state, commit }) {
    try {
      const res = await this.$axios.get('/documents/')
      commit('setdocuments', res.data)
    } catch (err) {
      console.log(err.response.data.error)

      swal(err.response.data.error)
    }
  },
  async fetchPublicDocuments({ state, commit }) {
    try {
      const res = await this.$axios.get('/documents/?public=true')
      commit('setpublicdocuments', res.data)
    } catch (err) {
      console.log(err.response.data.error)

      swal(err.response.data.error)
    }
  },
  async fetchSharedDocuments({ state, commit }) {
    try {
      const res = await this.$axios.get('/documents/?shared=true')
      commit('setshareddocuments', res.data)
    } catch (err) {
      console.log(err.response.data.error)

      swal(err.response.data.error)
    }
  },

  async fetchDocument(context, id) {
    try {
      const res = await this.$axios.get(`/documents/${id}/`)
      return res.data
    } catch (err) {
      if (err.response.data.error) {
        console.log(err.response.data.error)

        swal(err.response.data.error)
      }
    }
  },
  async fetchSharedDocument(context, id) {
    try {
      const res = await this.$axios.get(`/documents/${id}/?shared=true`)
      return res.data
    } catch (err) {
      if (err.response.data.error) {
        console.log(err.response.data.error)

        swal(err.response.data.error)
      }
    }
  },

  async fetchPublicDocument(context, id) {
    try {
      const res = await this.$axios.get(`/documents/${id}/?public=true`)
      return res.data
    } catch (err) {
      if (err.response.data.error) {
        console.log(err.response.data.error)

        swal(err.response.data.error)
      }
    }
  },

  async createDocument({ state, commit }, formData) {
    try {
      const res = await this.$axios.post('/documents/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      swal('Document successfully signed and saved!')
    } catch (err) {
      if (err.response.data.error) {
        console.log(err.response.data.error)

        swal(err.response.data.error.toString())
      }
    }
  },
  async verifyDocument({ state }, documentInfo) {
    try {
      const res = await this.$axios.post('/documents/verify/', documentInfo)

      return res.data.is_authentic
    } catch (err) {
      if (err.response.data.error) {
        console.log(err.response.data.error)

        swal(err.response.data.error.toString())
      } else {
        swal(err.toString())
      }
    }
  },

  searchDocuments({ commit }, keyword) {
    const vm = this
    debounce(
      (async function () {
        try {
          const response = await vm.$axios.post('/documents/search/', {
            keyword,
          })
          const searchResults = response.data

          // Commit the search results to the state or perform any other necessary actions
          commit('SET_SEARCH_RESULTS', searchResults)
        } catch (error) {
          console.error('Error searching documents:', error)
          swal('An error occurred while searching documents')
        }
      })(),
      700
    )
  },
}
