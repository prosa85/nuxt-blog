<template>
  <v-contianer class="p-10">
    <h2 class="text-center text-h3 mt-10 mb-10">Testimonials</h2>
    <v-carousel height="550" tile title="Moments of true" class="carousel-card" progress="secondary " hide-delimiters>
      <v-carousel-item class="text-center" v-for="testimonial in moduledata.testimonials">
        <v-card>
          <v-avatar size="150">
            <NuxtImg :src="imageUrlFor(testimonial.image).url()" format="webp" class="mt-1 mb-1" />
          </v-avatar>
          <v-card-title>
            <div v-text="testimonial.name" class="text-h4 mt-3"></div>
          </v-card-title>
          <v-card-text class="text-h5 mt-3">
            <div class="  d-flex justify-center">
              <div class="w-50">

                {{ testimonial.testimonial }}
              </div>
            </div>
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

.carousel-card {
  padding: 80px 0;
}

.v-card--variant-elevated {
  box-shadow: none;
}
</style>