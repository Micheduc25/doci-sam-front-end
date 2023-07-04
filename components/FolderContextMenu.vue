<template>
  <div
    v-show="show"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    class="contextmenu absolute z-10 bg-white shadow rounded-md py-2 w-48"
  >
    <ul>
      <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
      <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
      <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">View</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    position: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  transition: background-color 0.2s;
}
li:hover {
  background-color: #f7fafc;
}
</style>
