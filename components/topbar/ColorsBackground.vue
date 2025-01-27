<template>
    <div class="d-flex align-items-center gap-2">
      <input 
        type="color" 
        v-model="backgroundColor" 
        class="form-control form-control-color border rounded-circle"
        title="Color de fondo" 
      />
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  
  // Acceder al store
  const animationStore = useAnimationStore();
  const { backgroundColor1: backgroundColor } = storeToRefs(animationStore);
  </script>
  