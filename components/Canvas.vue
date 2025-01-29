<template>
  <div class="d-flex align-items-center justify-content-center border"
       :style="{ background: backgroundColor1, width: `${width}px`, height: `${height}px` }">
    <canvas ref="canvasRef" class="border border-white"></canvas>
    <div ref="textRef" class="animated-text"
         :style="{ fontSize: fontSize + 'px', fontFamily: font, color: textColor, textShadow: `2px 2px 4px ${shadowColor}` }">
      {{ phrase }}
    </div>
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
const { textColor, shadowColor, font, fontSize, backgroundColor1, duration } = storeToRefs(animationStore);

const orientationStore = useOrientationStore();
const { width, height } = storeToRefs(orientationStore);

const effectsStore = useEffectsStore();
const { activeEffects } = storeToRefs(effectsStore);

const canvasRef = ref(null);
const textRef = ref(null); // Nuevo ref para animar solo el texto

// 🎨 Función para dibujar solo el fondo en el canvas
const drawBackgroundOnCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  canvas.width = width.value;
  canvas.height = height.value;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor1.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// 🔥 Aplicar efectos solo al texto
const applyEffects = () => {
  console.log("📢 Aplicando efectos solo al texto con duración:", duration.value);

  const effectsArray = [...activeEffects.value];

  effectsArray.forEach(effect => {
    switch (effect) {
      case 'fade-in':
        gsap.fromTo(textRef.value, { opacity: 0 }, { opacity: 1, duration: duration.value });
        break;
      case 'shake':
        gsap.fromTo(textRef.value, { x: -5 }, { x: 5, duration: duration.value / 10, repeat: 5, yoyo: true });
        break;
      case 'zoom':
        gsap.fromTo(textRef.value, { scale: 0.5 }, { scale: 1, duration: duration.value });
        break;
      case 'spin':
        gsap.to(textRef.value, { rotateZ: 360, duration: duration.value });
        break;
      case 'typewriter':
        let currentText = '';
        const textArray = phrase.value.split('');
        gsap.to(textArray, {
          duration: duration.value,
          ease: 'none',
          onUpdate: () => {
            currentText += textArray.shift() || '';
            textRef.value.innerText = currentText;
          }
        });
        break;
      default:
        console.warn(`⚠️ Efecto desconocido: ${effect}`);
        break;
    }
  });

  nextTick(() => {
    drawBackgroundOnCanvas();
  });
};

// 🔄 Observa cambios en efectos y los aplica solo al texto
watch(activeEffects, async () => {
  console.log("📢 Cambió la lista de efectos:", activeEffects.value);
  await nextTick();
  applyEffects();
});

// 🔄 También redibuja el fondo cuando cambia el color de fondo
watch([backgroundColor1], async () => {
  await nextTick();
  drawBackgroundOnCanvas();
});

// 🔄 Actualiza el tamaño de la fuente dinámicamente
watch(fontSize, () => {
  if (textRef.value) {
    textRef.value.style.fontSize = `${fontSize.value}px`;
  }
});

onMounted(async () => {
  await nextTick();
  drawBackgroundOnCanvas();
});
</script>

<style scoped>
.animated-text {
  position: absolute;
}
</style>
