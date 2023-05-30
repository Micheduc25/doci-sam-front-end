import swal from 'sweetalert'

export const state = () => ({
  documents: [],
  publicDocuments: [],
})

export const getters = {
  getDocuments(state) {
    return state.documents
  },

  getPublicDocuments(state) {
    return state.publicDocuments
  },
}

export const mutations = {
  setdocuments(state, docs) {
    state.documents = docs
  },
  setpublicdocuments(state, docs) {
    state.publicDocuments = docs
  },

  adddocument(state, newDoc) {
    state.documents = state.documents.unshift(newDoc)
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

  async fetchDocument(context, { id, isPublic }) {
    try {
      const res = await this.$axios.get(`/documents/${id}/?public=${isPublic}`)
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
      commit('adddocument', res.data)

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
}
