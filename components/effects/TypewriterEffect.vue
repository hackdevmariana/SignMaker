<template>
    <button @click="applyEffect" class="btn btn-warning">Typewriter Effect</button>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import gsap from 'gsap';
  import { useEffectsStore } from '@/stores/useEffectsStore';
  import { usePhraseStore } from '@/stores/usePhraseStore';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  import { storeToRefs } from 'pinia';
  
  const effectsStore = useEffectsStore();
  const phraseStore = usePhraseStore();
  const animationStore = useAnimationStore();
  const { duration, fontSize, font } = storeToRefs(animationStore); // Ahora tomamos fontSize y font dinámicamente
  
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
      ctx.font = `${fontSize.value}px "${font.value}", sans-serif`; // 🔥 Ahora usa el tamaño de fuente dinámico
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentText, canvas.width / 2, canvas.height / 2);
    };
  
    const totalDuration = duration.value || 2; // Valor por defecto de 2s
    const letterDuration = totalDuration / textArray.length; // 🔥 Ahora cada letra aparecerá en el tiempo correcto
  
    // 🔄 Resetear el texto y animar letra por letra con duración ajustada
    currentText = '';
    textArray.forEach((letter, index) => {
      gsap.delayedCall(index * letterDuration, () => {
        currentText += letter;
        updateCanvas();
      });
    });
  };
  
  // 🔄 Actualizar el tamaño de la fuente dinámicamente cuando cambia
  watch([fontSize, font], applyEffect);
  </script>
  