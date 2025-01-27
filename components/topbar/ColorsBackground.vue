<template>
    <div class="flex items-center space-x-2">
      <label for="background" class="text-sm text-white">Fondo:</label>
      <input
        id="background"
        type="color"
        v-model="background"
        class="w-8 h-8 border rounded-full"
      />
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  
  const animationStore = useAnimationStore();
  const { background } = storeToRefs(animationStore);
  </script>
  