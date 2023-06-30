<template>
  <div class="w-full xl:w-1/2 flex flex-col mx-auto">
    <DocumentList
      v-if="searchResults && searchResults.length > 0"
      class=""
      :documents="searchResults"
    />

    <div v-else class="mt-4 p-8 bg-gray-200 rounded-lg">
      <p class="text-gray-600 text-lg">No search results found.</p>
      <p class="text-gray-400 mt-2">
        Please try again with a different keyword.
      </p>
    </div>
  </div>
</template>

<script>
import DocumentList from '~/components/DocumentList.vue'
export default {
  data() {
    return {
      searchKeyword: '',
    }
  },
  computed: {
    searchResults() {
      return this.$store.getters['documents/getSearchResults']
    },
  },
  methods: {
    search() {
      this.$store.dispatch('searchDocuments', this.searchKeyword)
    },
  },
  components: { DocumentList },
}
</script>
