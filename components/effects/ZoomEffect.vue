<template>
    <button @click="applyEffect" class="btn btn-primary">Zoom Effect</button>
  </template>
  
  <script setup>
  import gsap from 'gsap';
  import { useEffectsStore } from '@/stores/useEffectsStore';
  
  const effectsStore = useEffectsStore();
  
  const applyEffect = () => {
    effectsStore.setEffect('zoom');
  
    gsap.fromTo(
      'canvas', 
      { scale: 0.5 }, 
      { scale: 1, duration: 1, ease: 'power2.out' }
    );
  };
  </script>
  