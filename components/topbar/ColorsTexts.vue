<template>
    <div class="flex items-center space-x-2">
      <label class="text-sm text-white">Texto:</label>
      <input
        type="color"
        v-model="textColor"
        class="w-8 h-8 border rounded-full"
      />
  
      <label class="text-sm text-white">Sombra:</label>
      <input
        type="color"
        v-model="shadowColor"
        class="w-8 h-8 border rounded-full"
      />
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  
  const animationStore = useAnimationStore();
  const { textColor, shadowColor } = storeToRefs(animationStore);
  </script>
  