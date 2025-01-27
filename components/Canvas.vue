<template>
    <div class="d-flex align-items-center justify-content-center border"
         :style="{
           background: backgroundColor1, 
           width: `${width}px`, 
           height: `${height}px`
         }">
      <canvas ref="canvasRef" class="border border-white"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, nextTick } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePhraseStore } from '@/stores/usePhraseStore';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  import { useOrientationStore } from '@/stores/useOrientationStore';
  
  // Stores
  const phraseStore = usePhraseStore();
  const { text: phrase } = storeToRefs(phraseStore);
  
  const animationStore = useAnimationStore();
  const { textColor, shadowColor, font, fontSize, backgroundColor1 } = storeToRefs(animationStore);
  
  const orientationStore = useOrientationStore();
  const { width, height } = storeToRefs(orientationStore);
  
  const canvasRef = ref(null);
  
  // Función para dibujar el texto en el canvas
  const drawTextOnCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) {
      console.error("❌ Canvas no encontrado.");
      return;
    }
  
    canvas.width = width.value;
    canvas.height = height.value;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("❌ No se pudo obtener el contexto 2D.");
      return;
    }
  
    // Aplicar el fondo al canvas
    ctx.fillStyle = backgroundColor1.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Dibujar el texto
    ctx.fillStyle = textColor.value;
    ctx.font = `${fontSize.value}px "${font.value}", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = shadowColor.value;
    ctx.shadowBlur = 5;
  
    ctx.fillText(phrase.value, canvas.width / 2, canvas.height / 2);
  };
  
  // Redibujar cuando cambian los valores
  watch([phrase, textColor, shadowColor, font, fontSize, backgroundColor1], async (newValues, oldValues) => {
    console.log(`📢 Redibujando canvas:`, newValues);
    await nextTick();
    drawTextOnCanvas();
  });
  
  // Dibujar al montar el componente
  onMounted(async () => {
    console.log("✅ Canvas montado correctamente.");
    await nextTick();
    drawTextOnCanvas();
  });
  </script>
  