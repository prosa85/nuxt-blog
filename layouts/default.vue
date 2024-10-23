<template>
  <v-app>
    <Nav />
    <Nuxt-page></Nuxt-page>
  </v-app>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://cdn.sanity.io'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
  ]
})
</script>
<style>
.content {
  padding: 60px 0;
}
</style>
