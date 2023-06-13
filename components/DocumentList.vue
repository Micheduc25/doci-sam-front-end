<template>
  <div>
    <nuxt-link
      v-for="document in documents"
      :to="`/documents/${document.id}/?isShared=${document.receivers.includes(
        $auth.user.id
      )}&isPublic=${document.is_public}`"
      :key="document.id"
      class="card flex bg-white text-black items-center"
    >
      <div>
        <fa :icon="['fas', 'file']" class="w-16 h-16 mr-6 text-blue-500" />
      </div>
      <div>
        <h3 class="font-bold text-xl">
          {{ document.title }}
          <span v-if="document.is_public" class="text-green-500 font-bold"
            >(Public)</span
          >
        </h3>
        <p>
          <span class="font-bold"> <strong>Description</strong> </span>
          {{ document.description }}
        </p>
        <p><strong>File type:</strong> {{ getFileType(document.file) }}</p>
        <p class="flex justify-between">
          <span>
            <strong>Sent by:</strong>
            {{
              document.sender.username +
              (document.sender.id == $auth.user.id ? ' (You)' : '')
            }}
          </span>

          <span> </span>
        </p>

        <p>
          <strong>Sent on:</strong>
          {{ formateDocDate(document.created_at.toString()) }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { formatDateTime } from '~/utils/helpers'

export default {
  name: 'DocumentList',
  props: ['documents'],

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
