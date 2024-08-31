<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="w-screen bg-white lg:h-[90px] h-[60px] flex items-center">
    <router-link class="max-w-[40%]"
                 :to="'/'">
      <img src="@/assets/images/logo.png"
           class="w-full"
           alt="logo">
    </router-link>
  </header>
  <div class="content w-full relative overflow-auto">
    <RouterView />
  </div>
</template>
<style>
.content {
  height: calc(100vh - 90px);
}

@media not all and (min-width: 1024px) {
  .content {
    height: calc(100vh - 60px);
  }
}
</style>