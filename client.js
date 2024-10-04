import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "ombs0vlk", // find this at manage.sanity.io or in your sanity.json
  dataset: "vueproject", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2021-03-25",
});
