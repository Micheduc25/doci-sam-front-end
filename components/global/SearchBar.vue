<template>
  <div class="flex flex-grow-1 items-center">
    <input
      type="search"
      v-model="searchKeyword"
      placeholder="Search documents"
      class="px-4 py-2 text-black border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
    />
    <button
      @click="search"
      class="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Search
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: '',
    }
  },
  methods: {
    search() {
      this.$store.dispatch('documents/searchDocuments', this.searchKeyword)
    },
  },

  watch: {
    searchKeyword(newVal, oldVal) {
      if (!newVal || newVal.trim().length == 0) {
        this.$router.replace('/')
        return
      }

      if ((!oldVal || oldVal.trim().length == 0) && newVal.trim().length > 0) {
        this.$router.replace('/documents/search')
        return
      }
      if (newVal != oldVal) {
        this.search()
      }
    },
  },
}
</script>
