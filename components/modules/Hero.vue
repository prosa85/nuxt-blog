<template>
  <div class="hero" :style="backimage">
    <h1 class="text-h1"> {{ moduledata.title }}</h1>
    <div class="  d-flex justify-center">
      <div class="w-750 mt-5 mb-5 text-h5">
        <p>{{ moduledata.description }}</p>
      </div>
    </div>

    <v-btn :href="moduledata.learnMoreLink" variant="flat">Learn More</v-btn>
  </div>
</template>

<script>
import imageUrlBuilder from "@sanity/image-url";

export default {
  name: 'Hero',
  props: {
    moduledata: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sanity: useSanity(),
      backimage: '',
    }
  },
  created() {
    this.backimage = 'background-image: url(' + this.imageUrlFor(this.moduledata.image).url() + '); '
  },
  methods: {
    imageUrlFor(source) {
      return imageUrlBuilder(this.sanity.config).image(source);
    },
  },
}
</script>

<style scoped>
.hero {
  height: 100vh;
  background-size: cover;
  background-repeat: none;
  padding: 20%;
  text-align: center;
}

.hero h1 {
  font-size: 42px;
  color: rgb(114, 83, 26);
}
</style>