<template>
  <!-- Sidebar -->
  <div class="flex w-full container">
    <h1 class="text-4xl w-1/4">Kevin W. Griffin</h1>
    <nav class="hidden sm:block w-3/4ßß">
      <RouterLink :to="{ name: 'articles' }" class="px-3">Articles</RouterLink>
      <RouterLink :to="{ name: 'articles' }" class="px-3">Courses</RouterLink>
      <RouterLink :to="{ name: 'articles' }" class="px-3">Consulting</RouterLink>
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