<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { sort: [{ date: -1 }] }
</script>

<template>
  <main>
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="article in list" :key="article._path">
        <a :href="article.permalink"><h2>{{ article.title }}</h2></a>
        <p>{{ article.description }}</p>
      </div>
    </ContentList>
  </main>
</template>