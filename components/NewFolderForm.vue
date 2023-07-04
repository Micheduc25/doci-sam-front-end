<script setup>
import { onMounted, ref, useContext, useRoute } from '@nuxtjs/composition-api'
import swal from 'sweetalert'

const { store } = useContext()
const emits = defineEmits(['hidePopup', 'onCompleted'])
const route = useRoute()

const props = defineProps({
  parent: Object,
})

const folderName = ref('')
const isPublicFolder = ref(props.parent ? props.parent.is_public : false)

//function to emit hide popup event
const hidePopup = () => {
  emits('hidePopup')
}

//function to emit create folder event
const createFolder = async () => {
  if (folderName.value.trim() == '') {
    swal('You must specify a folder name')
    hidePopup()
    return
  }

  hidePopup()

  const folder = await store.dispatch('folders/createFolder', {
    name: folderName.value,
    is_public: isPublicFolder.value,
    parent: props.parent?.id ?? null,
  })
  emits('onCompleted', folder)

  folderName.value = ''
  isPublicFolder.value = false
}
</script>

<template>
  <div
    @click="hidePopup"
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75"
  >
    <div @click.stop="" class="bg-white p-6 rounded shadow-lg opacity-100">
      <h2 class="text-xl font-semibold mb-4">
        Create New Folder
        <span class="font-bold">
          {{ `${parent ? 'in "' + parent.name + '"' : ''}` }}</span
        >
      </h2>
      <form @submit.prevent="createFolder">
        <div class="mb-4">
          <label for="folderName" class="block font-medium">Folder Name</label>
          <input
            type="text"
            id="folderName"
            v-model="folderName"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div v-if="!parent || !route.params.id" class="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isPublicFolder"
            v-model="isPublicFolder"
            class="p-3 w-5 h-5 border border-gray-300 rounded-sm mr-2"
          />
          <label for="isPublicFolder" class="font-medium">Public</label>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  </div>
</template>
