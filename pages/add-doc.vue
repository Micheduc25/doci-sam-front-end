<template>
  <div class="form-container min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Add a document</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Document title</label>
        <input type="text" id="title" name="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          name="description"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <input
          type="file"
          id="file"
          ref="file"
          name="file"
          v-on:change="handleFileUpload()"
          required
        />
        <label for="file">
          <span v-if="!fileName">Choose a file</span>
          <span v-else>{{ fileName }}</span>
        </label>
      </div>
      <div class="flex items-center mb-5">
        <input
          v-model="isPublic"
          type="checkbox"
          id="checkbox"
          name="checkbox"
          class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label for="checkbox" class="ml-2 text-gray-700">Public</label>
      </div>

      <RecipientsSelector @recipients="setReceivers" />

      <button type="submit" name="submit" class="flex justify-center mt-6">
        <span v-if="!isLoading">Create</span>
        <Loader v-else />
      </button>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert'
import Loader from '~/components/Loader.vue'
import RecipientsSelector from '~/components/RecipientsSelector.vue'
import { getSHA256Hash } from '~/utils/signatures'

export default {
  middleware: 'auth',
  data() {
    return {
      title: '',
      description: '',
      isPublic: false,
      fileName: '',
      file: null,
      recievers: [],

      isLoading: false,
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
      this.fileName = this.file.name
    },

    setReceivers(list) {
      this.recievers = list.map((r) => r.id)

      console.log(this.recievers)
    },

    clearFields() {
      this.title = ''
      this.description = ''
      this.fileName = ''
      this.file = null
      this.isPublic = false
      this.recievers = []
    },

    async handleSubmit() {
      if (!this.file) return swal('Please select a file')

      if (this.recievers.length == 0)
        return swal('Please select at least one recipient')
      this.isLoading = true
      //generate hash of the file
      const reader = new FileReader()
      reader.onload = async () => {
        const data = reader.result
        const hash = await getSHA256Hash(data)
        swal('your document signature is ' + hash)
        let formData = new FormData()
        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('file', this.$refs.file.files[0])
        formData.append('signature', hash)
        formData.append('sender', this.$auth.user.id)
        formData.append('is_public', this.isPublic)
        formData.append('receivers ', this.recievers)

        await this.$store.dispatch('documents/createDocument', formData)

        this.isLoading = false

        this.clearFields()
      }
      reader.readAsText(this.file)
    },
  },
  components: { Loader, RecipientsSelector },
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2196f3;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type='text'],
textarea {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}

input[type='file'] {
  display: none;
}

label[for='file'] {
  display: inline-block;
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

label[for='file']:hover {
  background-color: #0d8bd9;
}

label[for='file'] span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #0d8bd9;
}
</style>
