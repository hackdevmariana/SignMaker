<template>
  <div class="d-flex align-items-center justify-content-center border"
       :style="{ background: backgroundColor1, width: `${width}px`, height: `${height}px` }">
    <canvas ref="canvasRef" class="border border-white"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import gsap from 'gsap';
import { usePhraseStore } from '@/stores/usePhraseStore';
import { useAnimationStore } from '@/stores/useAnimationStore';
import { useOrientationStore } from '@/stores/useOrientationStore';
import { useEffectsStore } from '@/stores/useEffectsStore';

// 📌 Stores
const phraseStore = usePhraseStore();
const { text: phrase } = storeToRefs(phraseStore);

const animationStore = useAnimationStore();
const { textColor, shadowColor, font, fontSize, backgroundColor1 } = storeToRefs(animationStore);

const orientationStore = useOrientationStore();
const { width, height } = storeToRefs(orientationStore);

const effectsStore = useEffectsStore();
const { activeEffects } = storeToRefs(effectsStore);

const canvasRef = ref(null);

const drawTextOnCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  canvas.width = width.value;
  canvas.height = height.value;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor1.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = textColor.value;
  ctx.font = `${fontSize.value}px "${font.value}", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = shadowColor.value;
  ctx.shadowBlur = 5;

  ctx.fillText(phrase.value, canvas.width / 2, canvas.height / 2);
};

// 🔥 Aplicar efectos seleccionados
const applyEffects = () => {
  console.log("Aplicando efectos:", activeEffects.value);
  
  if (activeEffects.value.includes('fade-in')) {
    gsap.fromTo('canvas', { opacity: 0 }, { opacity: 1, duration: 1 });
  }
  if (activeEffects.value.includes('shake')) {
    gsap.fromTo('canvas', { x: -5 }, { x: 5, duration: 0.1, repeat: 5, yoyo: true });
  }
  if (activeEffects.value.includes('zoom')) {
    gsap.fromTo('canvas', { scale: 0.5 }, { scale: 1, duration: 1 });
  }
  if (activeEffects.value.includes('typewriter')) {
    let currentText = '';
    const textArray = phrase.value.split('');
    gsap.to(textArray, {
      duration: 2,
      ease: 'none',
      onUpdate: () => {
        currentText += textArray.shift() || '';
        drawTextOnCanvas();
      }
    });
  }
};

// 🔄 Observa cambios en texto y efectos
watch([phrase, textColor, shadowColor, font, fontSize, backgroundColor1, activeEffects], async () => {
  await nextTick();
  drawTextOnCanvas();
  applyEffects();
});

onMounted(async () => {
  await nextTick();
  drawTextOnCanvas();
});
</script>
