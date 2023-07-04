<template>
  <button class="download-button" @click="downloadFile">
    Download Document
  </button>
</template>
<script>
export default {
  props: ['url'],
  methods: {
    downloadFile() {
      if (!this.url) return

      const link = document.createElement('a')
      link.target = '_blank'
      link.href = this.url
      link.download = this.url.substring(this.url.lastIndexOf('/') + 1)
      link.dispatchEvent(new MouseEvent('click'))
    },
  },
}
</script>
<style scoped>
.download-button {
  background-color: royalblue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
