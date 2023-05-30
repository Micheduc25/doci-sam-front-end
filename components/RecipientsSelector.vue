<template>
  <div class="relative">
    <div class="relative">
      <button
        @click="toggleDropdown"
        type="button"
        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 flex items-center w-full justify-between"
      >
        <span>Select Recipients</span>
        <svg
          class="h-5 w-5 text-gray-500"
          v-show="!isOpen"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
        <svg
          class="h-5 w-5 text-gray-500"
          v-show="isOpen"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 15l7-7 7 7"></path>
        </svg>
      </button>
    </div>
    <div
      v-show="isOpen"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <button
          v-for="recipient in recipients"
          :name="`recipient${recipient.id}`"
          :key="recipient.id"
          @click.prevent="selectRecipient(recipient)"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
          role="menuitem"
        >
          {{ recipient.username }}
        </button>
      </div>
    </div>
    <div class="mt-2">
      <div
        v-for="recipient in selectedRecipients"
        :key="recipient.id"
        class="inline-flex items-center bg-gray-200 text-gray-700 rounded-md px-3 py-1 text-sm mr-2"
      >
        <span>{{ recipient.username }}</span>
        <button
          @click="removeRecipient(recipient)"
          type="button"
          class="flex-shrink-0 ml-2 focus:outline-none"
        >
          <svg
            class="h-4 w-4 text-red-600 hover:text-red-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
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
      recipients: [],
      selectedRecipients: [],
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectRecipient(recipient) {
      if (!this.selectedRecipients.includes(recipient)) {
        this.selectedRecipients.push(recipient)
      }

      this.$emit('recipients', this.selectedRecipients)
    },
    removeRecipient(recipient) {
      this.selectedRecipients = this.selectedRecipients.filter(
        (r) => r !== recipient
      )
      this.$emit('recipients', this.selectedRecipients)
    },
  },

  async created() {
    const users = await this.$store.dispatch('users/fetchUsersList')

    if (users) {
      this.recipients = users
    }
  },
}
</script>

<style>
/* You can add custom styles here */
</style>
