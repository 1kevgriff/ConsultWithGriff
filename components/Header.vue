<template>
    <div class="w-1/4 sticky top-0 bg-blue-200 overflow-y-auto lg:static">
      <div class="p-4 lg:hidden">
        <!-- Mobile Navigation -->
        <div class="mb-4">
          <h1 class="text-xl font-bold">Kevin W. Griffin</h1>
        </div>
        <nav>
          <ul>
            <li><router-link to="/articles">Articles</router-link></li>
            <li><router-link to="/consulting">Consulting</router-link></li>
            <li><router-link to="/courses">Courses</router-link></li>
          </ul>
        </nav>
        <!-- Social Links -->
        <ul>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Mastodon</a></li>
          <li><a href="#">Bluesky</a></li>
          <li><a href="#">YouTube</a></li>
        </ul>
      </div>
      <div class="hidden lg:block p-4">
        <!-- Desktop Navigation -->
        <div class="mb-4">
          <h1 class="text-xl font-bold">Kevin W. Griffin</h1>
        </div>
        <nav>
          <ul>
            <li><router-link to="/articles">Articles</router-link></li>
            <li><router-link to="/consulting">Consulting</router-link></li>
            <li><router-link to="/courses">Courses</router-link></li>
          </ul>
        </nav>
        <!-- Social Links -->
        <ul>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Mastodon</a></li>
          <li><a href="#">Bluesky</a></li>
          <li><a href="#">YouTube</a></li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Header',
  }
  </script>
  

<script lang="ts" setup>

</script>

<style>

</style>