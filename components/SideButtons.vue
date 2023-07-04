<script setup>
import { useRoute } from '@nuxtjs/composition-api'

const emits = defineEmits(['showPopup'])

const props = defineProps({ showAddFolder: { type: Boolean, default: true } })

const showPopup = () => {
  emits('showPopup')
}
const route = useRoute()

const folderId = route.value.params.id
</script>

<template>
  <div class="fixed-buttons">
    <nuxt-link
      :to="{ path: '/add-doc', query: { folder: folderId } }"
      class="circular-button plus-button"
    >
      <fa :icon="['fas', 'plus']" class="w-8 h-8" />
    </nuxt-link>

    <button
      v-if="showAddFolder"
      @click="showPopup()"
      class="circular-button folder-button"
    >
      <fa :icon="['fas', 'folder-plus']" class="w-8 h-8" />
    </button>
  </div>
</template>
<style>
.fixed-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.circular-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
}
.plus-button {
  @apply bg-blue-500;
}
.folder-button {
  background-color: green;
}
</style>
