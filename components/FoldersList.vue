<script setup>
const props = defineProps({
  folders: {
    type: Array,
    required: true,
  },
})

const folder = props.folders
</script>
<template>
  <ul class="flex just-evenly flex-wrap">
    <li
      v-for="(folder, index) in folders"
      :key="`${folder.id}`"
      class="mr-6 mb-8"
    >
      <Folder :name="folder.name" :folder="folder" />
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
