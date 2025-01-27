<template>
    <div class="flex items-center space-x-2">
      <label for="fontSize" class="text-white text-sm">Tamaño:</label>
      <input 
        id="fontSize"
        type="range"
        min="10" 
        max="300" 
        step="1"
        v-model="fontSize"
        class="w-24 cursor-pointer"
      />
      <span class="text-white text-sm">{{ fontSize }}px</span>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  
  // Acceder al store de Pinia
  const animationStore = useAnimationStore();
  const { fontSize } = storeToRefs(animationStore);
  </script>
  