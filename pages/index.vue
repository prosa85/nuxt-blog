<template>
  <HomeView />
</template>
<script setup lang="ts">
const blogtitle = 'Altruist Blog'
useSeoMeta({
  title: blogtitle,
  ogTitle: blogtitle,
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>