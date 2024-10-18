<template>

  <v-card v-if="po.slug" transition="fade-transition" :href="`/blog/${po.slug.current}`"
    :class="firstCard ? 'first-card' : ''">
    <v-img class="mb-2" :src="po.image.asset.url" cover :height="firstCard ? 550 : 325"></v-img>
    <v-card-tile class="text-h5 ma-4 d-block"> {{ post.title }} </v-card-tile>
    <v-card-subtitle>By {{ po.author }}</v-card-subtitle>
    <v-card-text>{{ po.excerpt }}</v-card-text>
  </v-card>

</template>

<script>
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

export default {
  name: 'PostCard',
  props: ['post', 'firstCard'],
  setup(props) {
  },
  data() {
    return {
      po: this.post
    }
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    }

  },
};
</script>

<style scoped></style>