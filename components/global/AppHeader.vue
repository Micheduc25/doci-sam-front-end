<script setup lang="ts">
import { useContext, onMounted } from '@nuxtjs/composition-api'
import UserDropDown from '../UserDropDown.vue'
import SearchBar from './SearchBar.vue'

const { $auth } = useContext()

onMounted(() => {
  console.log($auth.user)
})
</script>
<template>
  <header class="app-header flex justify-between p-5 bg-blue-600 text-white">
    <nuxt-link to="/" class="flex items-center">
      <fa :icon="['fas', 'file']" class="w-8 h-8" />
      <span>Docu Manager</span>
    </nuxt-link>

    <SearchBar v-if="this.$auth.loggedIn" />

    <nav class="flex items-center">
      <nuxt-link v-if="$auth.loggedIn" to="/documents/public" class="mr-6">
        Public Docs
      </nuxt-link>
      <nuxt-link v-if="$auth.loggedIn" to="/documents/shared" class="mr-6">
        Shared with Me
      </nuxt-link>

      <UserDropDown v-if="$auth.loggedIn" />
      <nuxt-link
        v-else
        to="/auth/login"
        class="flex items-center group-hover:text-black ml-10"
      >
        <span class="gro">Login/Signup</span>
      </nuxt-link>
    </nav>
  </header>
</template>
<style scoped>
.nuxt-link-active {
  transition: 0.3s;
  @apply px-4 py-2;
}
.nuxt-link-active:hover {
  text-decoration: underline;
  text-decoration-color: white;
}
.nuxt-link-exact-active {
  background-color: white;
  @apply text-blue-500 rounded-lg;
}
</style>
