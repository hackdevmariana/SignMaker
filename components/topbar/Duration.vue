<template>
    <div class="flex items-center space-x-2">
      <label for="duration" class="text-sm text-white">Duración:</label>
      <input
        id="duration"
        type="range"
        min="1"
        max="10"
        step="1"
        v-model="duration"
        class="w-32"
      />
      <span class="text-sm text-white">{{ duration }}s</span>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  
  const animationStore = useAnimationStore();
  const { duration } = storeToRefs(animationStore);
  </script>
  