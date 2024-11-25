<template>
  <v-toolbar image="" theme="light">
    <v-toolbar-items variant="text">
      <router-link to="/" class="mt-2 mr-5">
        <v-img width="150px" class="ml-3" src="/assets/Altruist-logo_full-color-1.webp" to="/"></v-img>
      </router-link>
      <!-- {{ menus.menu }} -->
      <template v-for="menu in menus.menu">

        <v-menu v-if="menu.children">
          <v-list>
            <v-list-item v-for="child in menu.childrenlist">
              <v-list-item :to="child.url" :target="child.target">
                {{ child.label }}
              </v-list-item>
            </v-list-item>
          </v-list>

          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              {{ menu.label }}
            </v-btn>
          </template>

        </v-menu>
        <v-btn v-else :to="menu.url" :target="menu.target" variant="flat">
          {{ menu.label }}
        </v-btn>
      </template>



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
