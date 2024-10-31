<template>
  <section :style="getBackground()">
    <v-container class="">
      <v-row class="col-section mb-10" justify="space-around" align="center">
        <v-col xs="12" class="w-20" cols="5">
          <h2 class="mt-5 text-h4">{{ moduledata.title }}</h2>
          <p class="mt-6">{{ moduledata.description }}</p>

        </v-col>

        <v-col xs="12" cols="5">
          <NuxtImg :src="imageUrlFor(moduledata.image).url()" format="webp" class="mt-2 mb-2"
            sizes="100vw sm:50vw md:300px" />
        </v-col>
      </v-row>
      <!-- <img :src="fields.image" alt="Image" v-if="fields.image" /> -->
      <v-row class="padding-row-botton" align="center">
        <v-col v-for="col in moduledata.cols" xs class="col-content-block">
          <SanityContent :blocks="col.body" />
        </v-col>
      </v-row>

    </v-container>
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
    getBackground() {
      return 'background:' + this.moduledata.backgroundColor.value
    }
  }
};
</script>
<style>
.col-section {
  padding-top: 60px;
  color: rgb(219, 219, 219);
  max-width: 1440px;
  margin: auto;
}

.padding-row-botton {
  padding-bottom: 60px;
}

.col-content-block {
  color: white
}

@media (max-width: 768px) {
  .col-section {
    padding: 50px 32px;
  }

}
</style>