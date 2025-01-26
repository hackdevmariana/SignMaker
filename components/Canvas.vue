<template>
    <div class="relative w-full h-64 bg-black flex items-center justify-center">
      <canvas ref="canvasRef" class="absolute w-full h-full"></canvas>
      <p class="text-white text-2xl font-bold">{{ phrase }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePhraseStore } from '@/stores/usePhraseStore';
  
  // Acceder a la frase desde el store de Pinia
  const phraseStore = usePhraseStore();
  const { text: phrase } = storeToRefs(phraseStore);
  
  const canvasRef = ref(null);
  
  // Dibujar en el canvas cuando se cambia la frase
  const drawTextOnCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Establecer estilos
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  
    // Dibujar texto en el centro
    ctx.fillText(phrase.value, canvas.width / 2, canvas.height / 2);
  };
  
  // Redibujar cuando la frase cambie
  watch(phrase, () => {
    drawTextOnCanvas();
  });
  
  // Dibujar al montar el componente
  onMounted(() => {
    drawTextOnCanvas();
  });
  </script>
  
  <style scoped>
  canvas {
    width: 100%;
    height: 100%;
  }
  </style>
  