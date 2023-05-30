import swal from 'sweetalert'

export const state = () => ({
  users: [],
})

export const getters = {
  getUsers(state) {
    return state.users
  },
}

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
}

export const actions = {
  async fetchUsersList({ commit }) {
    try {
      const res = await this.$axios.get('/users/')
      commit('setUsers', res.data)
      return res.data
    } catch (error) {
      console.log(error)
      swal('We were unable to fetch the users list')
    }
  },

  async createUser({ commit }, formData) {
    try {
      const res = await this.$axios.post('/users/', formData)
      return res.data
    } catch (error) {
      swal('We were unable to create the user')
    }
  },
}
