<template>
  <!-- Sidebar -->
  <div class="flex">
    <h1 class="text-4xl">Kevin W. Griffin</h1>
    <nav class="hidden sm:block">
      <RouterLink :to="{ name: 'articles' }">Articles</RouterLink>
      <RouterLink :to="{ name: 'articles' }">Courses</RouterLink>
      <RouterLink :to="{ name: 'articles' }">Consulting</RouterLink>
    </nav>
  </div>
</template>
  
  <script>
export default {
  name: "Header",
};
</script>
  

<script lang="ts" setup>
</script>

<style>
</style>