<template>
  <section class="col-section">
    <v-row class="mb-10">
      <v-col xs="12">
        <h2 class="mt-5">{{ moduledata.title }}</h2>
        <p>{{ moduledata.description }}</p>
      </v-col>
      <v-col xs="12">
        <NuxtImg :src="imageUrlFor(moduledata.image).url()" format="webp" class="mt-2 mb-2"
          sizes="100vw sm:50vw md:400px" />
      </v-col>
    </v-row>
    <!-- <img :src="fields.image" alt="Image" v-if="fields.image" /> -->
    <v-row class="mt-5" align="center">
      <v-col v-for="col in moduledata.cols" xs>
        <SanityContent :blocks="col.body" />
      </v-col>
    </v-row>

  </section>
</template>

<script>

import { PortableText } from '@portabletext/vue';
import imageUrlBuilder from "@sanity/image-url";

export default {
  name: 'RowWithCols',
  components: {
    PortableText,
  },
  props: {
    moduledata: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      sanity: useSanity(),

    }
  },
  methods: {
    imageUrlFor(source) {
      return imageUrlBuilder(this.sanity.config).image(source);
    },
  }
};
</script>
<style>
.col-section {
  padding: 120px 32px;
  background-color: rgb(78, 82, 82);
  color: rgb(219, 219, 219);
  max-width: 1440px;
  margin: auto;
}

@media (max-width: 768px) {
  .col-section {
    padding: 60px 32px;
  }
}
</style>