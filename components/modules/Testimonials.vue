<template>
  <v-contianer class="p-10">
    <v-carousel height="400" tile>
      <v-carousel-item class="text-center" v-for="testimonial in moduledata.testimonials">
        <v-card :title="testimonial.name">
          <v-avatar size="250">
            <NuxtImg :src="imageUrlFor(testimonial.image).url()" format="webp" class="mt-2 mb-2" />
          </v-avatar>
          <v-card-text>
            {{ testimonial.testimonial }}
          </v-card-text>

        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-contianer>
</template>

<script>
import imageUrlBuilder from "@sanity/image-url";
export default {
  name: 'Testimonials',
  props: {
    moduledata: {
      type: Array,
      required: true
    }
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

}
</script>

<style scoped>
.content-container {
  max-width: 1440px;
}
</style>