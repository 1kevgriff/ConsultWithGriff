<template>
  <main>
    <ContentRenderer :value="data">
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
    <!-- <ContentList /> -->
  </main>
</template>


<script setup>
// const doc = ref();
const { path } = useRoute();

console.log("rendering ", path);
const { data } = await useAsyncData(path, () => {
  const searchLink = path.substring(1);
  var article =  queryContent("articles").where({ permalink: searchLink }).findOne();
  
  // if article is undefined, render as normal content
  console.log("article", article); 
  if (article) return article;
  console.log("searching for ", searchLink);
  console.log("articles", queryContent("/"));
  return queryContent("/").findOne();
});

</script>
