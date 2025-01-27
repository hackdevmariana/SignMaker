<template>
    <div class="d-flex align-items-center justify-content-center"
         :style="{
           background: generateBackground(),
           width: `${width}px`, 
           height: `${height}px`
         }">
      <canvas ref="canvasRef" class="border border-white"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePhraseStore } from '@/stores/usePhraseStore';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  import { useOrientationStore } from '@/stores/useOrientationStore';
  
  // Stores
  const phraseStore = usePhraseStore();
  const { text: phrase } = storeToRefs(phraseStore);
  
  const animationStore = useAnimationStore();
  const { backgroundColor1, backgroundColor2, backgroundType, linearDirection, textColor, shadowColor, font } = storeToRefs(animationStore);
  
  const orientationStore = useOrientationStore();
  const { width, height } = storeToRefs(orientationStore);
  
  const canvasRef = ref(null);
  
  // Redibujar el texto cuando cambian el fondo, la frase o la configuración del texto
  watch([phrase, backgroundColor1, backgroundColor2, backgroundType, textColor, shadowColor, font], () => {
    drawTextOnCanvas();
  });
  
  // Función para dibujar el texto en el canvas
  const drawTextOnCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
  
    canvas.width = width.value;
    canvas.height = height.value;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Aplicar estilos de texto
    ctx.fillStyle = textColor.value;
    ctx.font = `30px ${font.value}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = shadowColor.value;
    ctx.shadowBlur = 5;
  
    // Dibujar el texto en el centro del canvas
    ctx.fillText(phrase.value, canvas.width / 2, canvas.height / 2);
  };
  
  // Redibujar al montar el componente
  onMounted(() => {
    drawTextOnCanvas();
  });
  
  // Generar el fondo dinámico
  const generateBackground = () => {
    switch (backgroundType.value) {
      case 'linear': return `linear-gradient(${linearDirection.value}, ${backgroundColor1.value}, ${backgroundColor2.value})`;
      case 'radial': return `radial-gradient(${backgroundColor1.value}, ${backgroundColor2.value})`;
      case 'conic': return `conic-gradient(${backgroundColor1.value}, ${backgroundColor2.value})`;
      case 'repeating-linear': return `repeating-linear-gradient(${linearDirection.value}, ${backgroundColor1.value}, ${backgroundColor2.value} 20%)`;
      case 'repeating-radial': return `repeating-radial-gradient(${backgroundColor1.value}, ${backgroundColor2.value} 20%)`;
      case 'repeating-conic': return `repeating-conic-gradient(${backgroundColor1.value}, ${backgroundColor2.value} 20%)`;
      default: return backgroundColor1.value;
    }
  };
  </script>
  