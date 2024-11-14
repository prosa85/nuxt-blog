<template>
  <v-toolbar image="" theme="light">
    <v-toolbar-items variant="text">
      <router-link to="/" class="mt-2 mr-5">
        <v-img width="150px" class="ml-3" src="/assets/Altruist-logo_full-color-1.webp" to="/"></v-img>
      </router-link>
      <v-btn v-for="menu in menus.menu" :to="menu.url">
        {{ menu.label }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
const query = `*[_type == "settings"]{_id, menu}[0]`;
export default {

  name: 'Nav',
  data() {
    return {
      menus: []
    }

  },
  async created() {
    this.fetchData()
  },
  methods: {
    getLink(link) {
      return '/' + link
    },
    fetchData() {

      useSanityQuery(query).then(
        (result) => {
          // this.loading = false;
          this.menus = result.data;


        },
        (error) => {
          // this.error = error;
        }
      );

    }
  }
}

</script>
