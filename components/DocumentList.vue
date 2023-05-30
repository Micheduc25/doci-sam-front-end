<template>
  <div>
    <nuxt-link
      v-for="document in documents"
      :to="`/documents/${document.id}?isPublic=${isPublic}`"
      :key="document.id"
      class="card flex bg-blue-500 text-white items-center"
    >
      <div><fa :icon="['fas', 'file']" class="w-16 h-16" /></div>
      <div>
        <h3 class="font-bold text-xl">{{ document.title }}</h3>
        <p>{{ document.description }}</p>
        <p>File type: {{ getFileType(document.file) }}</p>
        <p class="flex justify-between">
          <span>
            Sent by:
            {{
              document.sender.username +
              (document.sender.id == $auth.user.id ? ' (You)' : '')
            }}
          </span>

          <span> </span>
        </p>

        <p>Sent on: {{ formateDocDate(document.created_at.toString()) }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { formatDateTime } from '~/utils/helpers'

export default {
  name: 'DocumentList',
  props: ['documents', 'isPublic'],

  methods: {
    getFileType(file) {
      if (!file) return 'FILE'

      const splittedName = file.split('.')

      return splittedName[splittedName.length - 1].toUpperCase()
    },

    formateDocDate(date) {
      return formatDateTime(date)
    },
  },
}
</script>

<style>
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
}

.card h3 {
  margin-top: 0;
}

.card p:last-child {
  margin-bottom: 0;
}
</style>
