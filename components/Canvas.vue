<template>
    <div class="relative w-full h-64 flex items-center justify-center border border-white" :style="{ backgroundColor: background }">
      <canvas ref="canvasRef" class="absolute w-full h-full"></canvas>
      <p class="text-2xl font-bold z-10" :style="{ color: textColor, textShadow: `2px 2px 4px ${shadowColor}`, fontFamily: font }">
        {{ phrase }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePhraseStore } from '@/stores/usePhraseStore';
  import { useAnimationStore } from '@/stores/useAnimationStore';
  
  const phraseStore = usePhraseStore();
  const { text: phrase } = storeToRefs(phraseStore);
  
  const animationStore = useAnimationStore();
  const { background, textColor, shadowColor, font } = storeToRefs(animationStore);
  
  const canvasRef = ref(null);
  
  watch(phrase, () => drawTextOnCanvas());
  watch(background, () => drawTextOnCanvas());
  watch(textColor, () => drawTextOnCanvas());
  watch(shadowColor, () => drawTextOnCanvas());
  watch(font, () => drawTextOnCanvas());
  
  const drawTextOnCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
  
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = textColor.value;
    ctx.font = `30px ${font.value}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(phrase.value, canvas.width / 2, canvas.height / 2);
  };
  
  onMounted(() => drawTextOnCanvas());
  </script>
  