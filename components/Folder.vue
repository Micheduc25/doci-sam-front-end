<script setup>
import { onMounted, ref, useRouter } from '@nuxtjs/composition-api'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: String,
  folder: {
    type: Object,
    required: true,
  },
})

const size = ref(24)
const folderRef = ref(null)

const showContextMenu = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })

const showCustomContextMenu = (event) => {
  event.preventDefault()
  showContextMenu.value = true
  contextMenuPosition.value = { x: event.clientX, y: event.clientY }

  const menus = document.querySelectorAll('.contextmenu')
  menus.forEach((m) => {
    m.style.display = 'none'
  })

  showContextMenu.value = true

  folderRef.value.$el.style.display = 'block'
}
onMounted(() => {
  console.log(folderRef.value.$el)
  document.addEventListener('click', (e) => {
    if (showContextMenu) showContextMenu.value = false
  })
})
</script>

<template>
  <nuxt-link
    @click.stop=""
    :to="`/folders/${folder.id}`"
    :class="`cursor-pointer w-${size}`"
    ref="folderRef"
  >
    <FolderContextMenu
      :show="showContextMenu"
      :position="contextMenuPosition"
    />
    <div @contextmenu="showCustomContextMenu($event)" class="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        :fill="color ?? `${folder.is_public ? 'green' : 'red'}`"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="`feather feather-folder w-full h-${size}`"
        style="color: #000000"
      >
        <path
          d="M4 2h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z"
        ></path>
        <path d="M22 6h-8l-2-2H4.01L4 6H2v16h20V6z"></path>
      </svg>
    </div>

    <div class="text-center font-bold">
      {{ props.name }}
    </div>
  </nuxt-link>
</template>
