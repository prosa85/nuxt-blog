<template>
  <h1 class="ma-6 text-h2 w-33">Welcome Altruist Sanity Blog</h1>
  <div class="loading" v-if="loading">Loading...</div>
  <div v-if="error" class="error">
    {{ error }}
  </div>
  <v-container v-else>
    <v-row>
      <v-col :lg="index == 0 ? 12 : 6" md="12" v-for="(post, index ) in posts[page]" class="" :key="post._id">
        <PostCard :post="post" :firstCard="index == 0 ? true : false" />
      </v-col>
    </v-row>
    <v-container v-show="total > 1">
      <v-row>
        <v-col>
          <v-bottom-navigation v-model="value" color="primary" active>
            <v-btn :disabled="page == 1" @click="paginationBack()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn class="text-h6" disabled>
              {{ page }}

            </v-btn>
            <v-btn @click="paginationForward()" :disabled="page >= total || loading">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-bottom-navigation>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

</template>

<script>
import sanity from "../client";

const countTotal = `count(*[_type =='post'])`;
const perPage = 5;
const firstQuery = `*[_type == "post"] | order(_id) [0..${perPage - 1}]{
  _id,
  title,
  "image": mainImage{
  asset->{
  _id,
  url
}
},
  slug,
  excerpt,
  "author":author->name
}`;


export default {
  name: "HomeView",
  data() {
    return {
      loading: true,
      posts: [],
      page: 1,
      total: 0,
      numberPosts: 0,
      key: process.env.SANITY_PROJECT
    };
  },
  created() {
    this.fetchData(firstQuery);
    sanity.fetch(countTotal).then((count) => {
      this.numberPosts = count;
      this.total = Math.ceil(count / perPage);
    }, (error) => {
      console.log("error pulling count");
    });
  },
  watch: {},
  methods: {
    paginationBack() {
      this.page = this.page - 1;
    },
    paginationForward() {
      this.fetchNextPosts();
    },
    fetchData(query) {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then((posts) => {
        this.loading = false;
        this.posts[this.page] = posts;
      }, (error) => {
        this.error = error;
      });
    },
    fetchNextPosts() {
      var lastId = "";
      lastId = this.posts[this.page][this.posts[this.page].length - 1]._id;
      this.page = this.page + 1;
      if (!lastId) {
        return [];
      }
      const nextQuery = `*[_type == "post" && _id > "${lastId}"] | order(_id) [0..${perPage - 1}]{
          _id,
          title,
          "image": mainImage{
            asset->{
              _id,
              url
            }
          },
          slug,
          excerpt,
          "author":author->name
          }`;
      this.fetchData(nextQuery);
    }
  },

};
</script>
