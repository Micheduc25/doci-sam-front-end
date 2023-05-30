<template>
  <div class="upload-button">
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
    <label for="file">
      <span v-if="!fileName">Choose a file</span>
      <span v-else>{{ fileName }}</span>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileName: '',
    }
  },
  methods: {
    handleFileUpload() {
      let file = this.$refs.file.files[0]
      this.fileName = file.name
      this.$emit('fileChanged', { file, fileName: this.fileName })
    },
  },
}
</script>

<style scoped>
.upload-button {
  display: flex;
  align-items: center;
}

input[type='file'] {
  display: none;
}

label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

label:hover {
  background-color: #0d8bd9;
}

label span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
