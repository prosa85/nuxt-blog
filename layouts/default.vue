<template>
  <v-app>
    <Nav />
    <v-container class="content-container">
      <Nuxt-page></Nuxt-page>
    </v-container>
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

.content-container {
  max-width: 1440px;
  margin: 60px auto 0;
}
</style>
