<template>
  <v-app>
    <Nav />
    <v-container class="content-container">
      <Nuxt-page></Nuxt-page>
    </v-container>
  </v-app>
</template>

<script setup>

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
