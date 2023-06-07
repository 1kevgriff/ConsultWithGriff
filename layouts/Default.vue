<template>
    <div class="h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div class="h-screen overflow-auto sticky top-0 bg-primary-green">
        <Header />
      </div>
      <div class="overflow-y-scroll bg-white">
        <!-- Content -->
        <div class="p-4">
          <slot />
        </div>
      </div>
    </div>
  </template>
  

<script lang="ts" setup>
</script>

<style>
</style>