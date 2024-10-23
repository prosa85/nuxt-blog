<template>
  <component :is="item._type" :moduledata="item" v-for="item in post.pageModules" v-if="!loading"></component>
</template>

<script>
import { PortableText } from '@portabletext/vue';
import imageUrlBuilder from "@sanity/image-url";


const query = `*[slug.current == $slug] {
  _id,
  title,
  slug,
  pageModules,
    }[0]
    `;

export default {

  name: "PageBuilt",
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
    getComponent(item) {
      switch (item._type) {
        case 'hero': resolveComponent('Hero',);

          break;

        default:
          break;
      }

    },
    fetchData() {

      this.error = this.post = null;
      this.loading = true;

      useSanityQuery(query, { slug: this.$route.params.pageBuilt }).then(
        (post) => {
          this.loading = false;
          this.post = post.data;
          // this.authorImage = this.imageUrlFor(this.post.author.image).url()
          // this.authorImage =
          // this.blocks = this.post.body;
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