<template>
    <div class="flex items-center space-x-2">
      <label for="font" class="text-sm text-white">Fuente:</label>
      <select id="font" v-model="font" class="p-1 border rounded">
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Courier New">Courier New</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  
  const animationStore = useAnimationStore();
  const { font } = storeToRefs(animationStore);
  </script>
  