<template>
  <div class="hero" :style="backimage">
    <h1>FROM hero {{ moduledata.title }}</h1>
    <p>{{ moduledata.description }}</p>

    <a :href="moduledata.learnMoreLink">Learn More</a>
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
</style>