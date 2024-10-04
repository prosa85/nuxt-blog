<template>

  <v-app>
    <Nav />
    <v-main class="content-container">
      <Nuxt-page />
    </v-main>

    <!-- <AppFooter /> -->
  </v-app>
</template>

<script setup>
//
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
