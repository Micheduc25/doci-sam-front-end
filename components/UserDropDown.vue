<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      type="button"
      class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    >
      <span>{{ $auth.user.username }}</span>
      <svg
        class="h-5 w-5 ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
          clip-rule="evenodd"
        ></path>
      </svg>

      <img
        :src="'http://localhost:8000/' + $auth.user.profile_picture"
        alt="user's profile picture"
        class="rounded-full w-8 h-8 flex-grow-0 flex-shrink-0 mr-3"
      />
    </button>
    <div
      v-show="isOpen"
      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <nuxt-link
          to="/#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Profile
        </nuxt-link>
        <button
          @click="$auth.logout()"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
