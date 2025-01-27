<template>
    <div class="d-flex align-items-center gap-2">
      <select id="orientation" v-model="mode" @change="updateOrientation" class="form-select form-select-sm w-auto">
        <option value="horizontal">Horizontal (16:9)</option>
        <option value="vertical">Vertical (9:16)</option>
        <option value="cuadrado">Cuadrado (1:1)</option>
        <option value="story">Story (750x1334)</option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useOrientationStore } from '@/stores/useOrientationStore';
  
  // Acceder al store de orientación
  const orientationStore = useOrientationStore();
  const { mode } = storeToRefs(orientationStore);
  
  // Cambiar la orientación en el store
  const updateOrientation = () => {
    orientationStore.setMode(mode.value);
    console.log(`📐 Modo cambiado a: ${mode.value}`);
  };
  </script>
  