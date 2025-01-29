<template>
    <button @click="applyEffect" class="btn btn-primary">Fade In</button>
  </template>
  
  <script setup>
  import gsap from 'gsap';
  import { useEffectsStore } from '@/stores/useEffectsStore';
  
  const effectsStore = useEffectsStore();
  
  const applyEffect = () => {
    effectsStore.setEffect('fade-in');
    gsap.fromTo('canvas', { opacity: 0 }, { opacity: 1, duration: 1.5 });
  };
  </script>
  