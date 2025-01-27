<template>
    <div class="relative w-full h-64 bg-red-500 flex items-center justify-center border border-white">
      <canvas ref="canvasRef" class="absolute w-full h-full"></canvas>
      <p class="text-2xl font-bold z-10">{{ phrase }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePhraseStore } from '@/stores/usePhraseStore';
  
  // Acceder a la frase desde Pinia
  const phraseStore = usePhraseStore();
  const { text: phrase } = storeToRefs(phraseStore);
  
  const canvasRef = ref(null);
  
  // Probar que Pinia está leyendo bien la frase
  watch(phrase, (newValue) => {
    console.log("📢 Frase actual en Pinia:", newValue);
  });
  
  // Dibujar la frase en el canvas
  const drawTextOnCanvas = () => {
    console.log("🎨 Intentando dibujar en el canvas...");
  
    const canvas = canvasRef.value;
    if (!canvas) {
      console.log("❌ No se encontró el canvas.");
      return;
    }
  
    // Ajustar dimensiones del canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log("❌ No se pudo obtener el contexto del canvas.");
      return;
    }
  
    console.log("🖊️ Dibujando la frase en el canvas:", phrase.value);
  
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
    console.log("✅ Canvas.vue montado correctamente.");
    drawTextOnCanvas();
  });
  </script>
  
  <style scoped>
  canvas {
    width: 100%;
    height: 100%;
  }
  </style>
  