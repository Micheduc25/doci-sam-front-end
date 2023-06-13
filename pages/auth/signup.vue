<template>
  <div class="flex justify-center items-center h-screen w-full">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 xl:w-1/3 mx-auto"
      @submit.prevent="submitForm"
    >
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-4"
      >
        Create an Account
      </h2>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          v-model="form.username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          required
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="firstname"
        >
          First Name
        </label>
        <input
          v-model="form.firstname"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstname"
          type="text"
          placeholder="First Name"
          required
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="lastname"
        >
          Last Name
        </label>
        <input
          v-model="form.lastname"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastname"
          type="text"
          placeholder="Last Name"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="form.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="form.password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          v-model="form.confirmPassword"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        />
      </div>
      <div class="flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          <span v-show="!isLoading"> Sign Up</span>
          <Loader class="w-8 h-8" v-show="isLoading" />
        </button>
      </div>
      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        {{ ' ' }}
        <nuxt-link
          to="/auth/login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Login</nuxt-link
        >
      </p>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert'
import Loader from '~/components/Loader.vue'

export default {
  data() {
    return {
      isLoading: false,
      form: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    async submitForm() {
      if (this.form.password != this.form.confirmPassword) {
        return swal("The passwords don't match", { icon: 'error' })
      }

      this.isLoading = true
      const user = this.$store.dispatch('users/createUser', this.form)
      if (user) {
        this.$auth.loginWith('local', {
          data: { username: this.form.username, password: this.form.password },
        })
        swal('User successfully created!', { timer: 3000 })
      }

      this.isLoading = false
    },
  },
  components: { Loader },
}
</script>
