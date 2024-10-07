<template>
  <v-container>

    <v-row>
      <div class="loading" v-if="loading">Loading...</div>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <v-col v-if="post" class="content">
        <h1 class="text-h3 w-lg-66">{{ post.title }}</h1>
        <v-img width="" v-if="post.image" :src="post.image.asset.url" height="600" class="mt-5 mb-10"></v-img>
        <h6>By: <v-avatar size="45" class="ml-3 mr-2" v-if="authorImage" :image="authorImage"></v-avatar>
          {{ post.author.name }}
        </h6>
        <div class="mt-5 post-content">
          <PortableText :value="blocks" />
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
  created() {
    this.fetchData();
  },
  methods: {
    imageUrlFor(source) {
      return imageUrlBuilder(this.sanity.config).image(source);
    },
    fetchData() {

      this.error = this.post = null;
      this.loading = true;

      this.sanity.fetch(query, { slug: this.$route.params.SinglePost }).then(
        (post) => {
          this.loading = false;
          this.post = post;
          this.authorImage = this.imageUrlFor(post.author.image).url()
          this.blocks = post.body;
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
</style>