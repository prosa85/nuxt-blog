<template>
  <div class="form-section" :style="getBackground()">
    <v-container>
      <h1 class="text-h4 mt-5 mb-10">
        {{ moduledata.title }}
      </h1>
      <div id="hubspotForm" v-once></div>
    </v-container>
  </div>

</template>
formid
<script>
export default {
  name: 'Form',
  props: {
    moduledata: {
      type: Array,
      required: true
    },
  },
  methods: {

    getBackground() {
      return 'background:' + this.moduledata.backgroundColor.value
    }
  },
  mounted() {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "4826914",
          formId: this.moduledata.formid,
          target: "#hubspotForm"
        })
      }
    })
  }
}
</script>
<style>
#hubspotForm {
  max-width: 600px;

}

.form-section {
  padding-top: 60px;
  padding-bottom: 60px;
}
</style>