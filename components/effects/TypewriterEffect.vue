<template>
    <button @click="applyEffect" class="btn btn-warning">Typewriter Effect</button>
  </template>
  
  <script setup>
  import gsap from 'gsap';
  import { useEffectsStore } from '@/stores/useEffectsStore';
  import { usePhraseStore } from '@/stores/usePhraseStore';
  
  const effectsStore = useEffectsStore();
  const phraseStore = usePhraseStore();
  
  const applyEffect = () => {
    effectsStore.setEffect('typewriter');
  
    const text = phraseStore.text; // Obtener el texto del store
    const textArray = text.split('');
    let currentText = '';
  
    const updateCanvas = () => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#fff';
      ctx.font = '40px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentText, canvas.width / 2, canvas.height / 2);
    };
  
    gsap.to(textArray, {
      duration: 2,
      ease: 'none',
      onUpdate: () => {
        currentText += textArray.shift() || '';
        updateCanvas();
      }
    });
  };
  </script>
  