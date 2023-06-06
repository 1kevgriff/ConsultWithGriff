<template>
  <main class="Layout">
    <ContentRenderer :value="data">
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
    <!-- <ContentList /> -->
  </main>
</template>


<script setup>
const { path } = useRoute();

const hardCodedContent = ["about", "consulting", "contact", ""];

console.log("rendering ", path);
const { data } = await useAsyncData(path, () => {

  // if path is in hardCodedContent, render as normal content
  if (hardCodedContent.includes(path.substring(1))) {
    console.log("hard coded content");
    useContentHead(queryContent(path).findOne());
    return queryContent(path).findOne();
  }

  const searchLink = path.substring(1);
  var article = queryContent("articles")
    .where({ permalink: searchLink })
    .findOne();

  // if article is undefined, render as normal content
  console.log("article", article);
  if (article) return article;
  console.log("searching for ", searchLink);
  console.log("articles", queryContent("/"));
  return queryContent("/").findOne();
});

useContentHead(data);

// const head = () => {
//   console.log("head", this.data)
//   return {
//     title: this.data.title,
//     meta: [
//       {
//         hid: "description",
//         name: "description",
//         content: this.data.description,
//       },
//       // Open Graph
//       { hid: "og:title", property: "og:title", content: this.data.title },
//       {
//         hid: "og:description",
//         property: "og:description",
//         content: this.data.description,
//       },
//       // Twitter Card
//       { hid: "twitter:title", name: "twitter:title", content: this.data.title },
//       {
//         hid: "twitter:description",
//         name: "twitter:description",
//         content: this.data.description,
//       },
//     ],
//   };
// };
</script>
