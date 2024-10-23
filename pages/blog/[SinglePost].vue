<template>
  <v-container class="content-container">

    <v-row>
      <!-- <div class="loading" v-if="loading">Loading...</div>

      <div v-if="error" class="error">
        {{ error }}
      </div> -->

      <v-col v-if="post" class="content">
        <h1 class="text-h3 w-lg-66">{{ post.title }}</h1>
        <!-- <v-img width="" v-if="post.image" :src="post.image.asset.url"  class="mt-5 mb-10"></v-img> -->
        <NuxtImg :src="post.image.asset.url" height="600" width="600" format="webp" class="mt-5 mb-10" />
        <!-- <SanityImage :asset-id="post.image.asset._id" format="auto"></SanityImage> -->
        <h6>By: <v-avatar size="45" class="ml-3 mr-2" v-if="authorImage" :image="authorImage"></v-avatar>
          {{ post.author.name }}
        </h6>
        <div class="mt-5 post-content">
          <!-- <PortableText :value="blocks" /> -->
          <SanityContent :blocks="blocks" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PortableText } from '@portabletext/vue';
import imageUrlBuilder from "@sanity/image-url";



const query = `*[slug.current == $slug] {
  _id,
  title,
  slug,
  body, 
  "image": mainImage{
    asset->{
      _id,
      url
      }
      },
      "author":author->{name, image}
      }[0]
      `;


export default {
  name: "SinglePost",
  components: { PortableText },
  data() {
    return {
      sanity: useSanity(),
      loading: true,
      post: [],
      blocks: [],
      authorImage: '',
    };
  },
  async created() {

    this.fetchData();

  },
  methods: {
    imageUrlFor(source) {
      return imageUrlBuilder(this.sanity.config).image(source);
    },
    fetchData() {

      this.error = this.post = null;
      this.loading = true;

      useSanityQuery(query, { slug: this.$route.params.SinglePost }).then(
        (post) => {
          this.loading = false;
          this.post = post.data;
          this.authorImage = this.imageUrlFor(this.post.author.image).url()
          // this.authorImage =
          this.blocks = this.post.body;
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },

};
</script>

<style>
.post-content {
  h2 {
    padding: 20px 0;
    font-size: 28px;
  }

  h3 {
    font-size: 18px;
    margin: 15px 0;
  }

  ul {
    padding-left: 20px;
    padding-top: 10px;
  }

  ul li {
    margin: 5px 0;
  }
}

.content-container {
  max-width: 1440px;
  margin: 120px auto 0;
}
</style>