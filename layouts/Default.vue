<template>
  <div>
    <div class="w-full h-3 bg-gradient-to-r from-green-300 to-green-500"></div>

    <!-- Main content -->
    <div class="container w-3/4 mx-auto">
      <Header />
      <slot />
    </div>

    <Footer />
  </div>
</template>
<script lang="ts" setup>
</script>

<style></style>