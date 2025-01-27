<template>
  <div class="flex items-center space-x-2">
    <select id="font" v-model="font" class="p-1 border rounded">
      <option v-for="fontOption in fontOptions" :key="fontOption.value" :value="fontOption.value"
        :style="{ fontFamily: fontOption.value }">
        {{ fontOption.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAnimationStore } from '@/stores/useAnimationStore';

// Definir las principales tipografías de Google Fonts
const fontOptions = [
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' }
];

// Acceder al store de Pinia
const animationStore = useAnimationStore();
const { font } = storeToRefs(animationStore);
</script>
