<script setup lang="ts">
import TopBar from '../components/TopBar.vue';

</script>

<template>
  <div>
    <TopBar />
    <main>
      <slot />
    </main>
    <footer>Footer del layout</footer>
  </div>
</template>
