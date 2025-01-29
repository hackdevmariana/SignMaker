<template>
  <div class="canvas-container"
       :style="{ background: backgroundColor1, width: `${width}px`, height: `${height}px` }">
    <!-- Lienzo de fondo -->
    <canvas ref="canvasRef" class="border border-white"></canvas>

    <!-- Texto animado (superpuesto al lienzo) -->
    <div ref="textRef" class="animated-text"
         :style="{
           fontSize: fontSize + 'px',
           fontFamily: font,
           color: textColor,
           textShadow: `2px 2px 4px ${shadowColor}`,
           width: `${width}px`,
           height: `${height}px`
         }">
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
const textRef = ref(null);

// 🎨 Función para dibujar el fondo en el canvas
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

// 🔥 Aplicar efectos al texto
const applyEffects = () => {
  console.log("📢 Aplicando efectos:", activeEffects.value);

  if (!textRef.value) {
    console.error("❌ No se encontró el elemento de texto.");
    return;
  }

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
      case 'bounce':
        gsap.fromTo(textRef.value, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: duration.value, ease: "bounce.out" });
        break;
      case 'blur-in':
        gsap.fromTo(textRef.value, { filter: "blur(10px)", opacity: 0 }, { filter: "blur(0px)", opacity: 1, duration: duration.value });
        break;
      case 'flicker':
        gsap.fromTo(textRef.value, { opacity: 0 }, { opacity: 1, repeat: 3, yoyo: true, duration: duration.value / 4 });
        break;
      case 'wave':
        gsap.fromTo(textRef.value, { x: -10 }, { x: 10, duration: duration.value / 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        break;
      case 'skew-in':
        gsap.fromTo(textRef.value, { skewX: 30, opacity: 0 }, { skewX: 0, opacity: 1, duration: duration.value });
        break;
      case 'neon-glow':
        gsap.to(textRef.value, { textShadow: "0px 0px 20px #ff00ff", duration: duration.value, repeat: -1, yoyo: true });
        break;
      case 'rotate-in':
        gsap.fromTo(textRef.value, { rotate: -180, opacity: 0 }, { rotate: 0, opacity: 1, duration: duration.value });
        break;
      case 'stretch':
        gsap.fromTo(textRef.value, { scaleY: 0.2, opacity: 0 }, { scaleY: 1, opacity: 1, duration: duration.value });
        break;
      case 'drop-in':
        gsap.fromTo(textRef.value, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: duration.value, ease: "bounce.out" });
        break;
      case 'slide-in':
        gsap.fromTo(textRef.value, { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: duration.value, ease: "power2.out" });
        break;
      case 'expand':
        gsap.fromTo(textRef.value, { scale: 0.1, opacity: 0 }, { scale: 1, opacity: 1, duration: duration.value, ease: "back.out(1.7)" });
        break;
      case 'flash':
        gsap.fromTo(textRef.value, { opacity: 0 }, { opacity: 1, duration: duration.value, repeat: 2, yoyo: true });
        break;
      case 'pop':
        gsap.fromTo(textRef.value, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: duration.value, ease: "elastic.out(1, 0.5)" });
        break;
      case 'fade-up':
        gsap.fromTo(textRef.value, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: duration.value, ease: "power1.out" });
        break;
      case 'random-letters':
        const textArray = phrase.value.split('');
        textRef.value.innerHTML = textArray.map((char, index) => `<span style="opacity: 0" class="char-${index}">${char}</span>`).join('');
        textArray.forEach((_, index) => {
          gsap.to(`.char-${index}`, { opacity: 1, duration: duration.value / 2, delay: Math.random() * duration.value });
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

// 🔄 Asegurar que el lienzo y texto se inicializan correctamente
onMounted(async () => {
  console.log("✅ Canvas montado correctamente.");
  await nextTick();
  drawBackgroundOnCanvas();
});
</script>

<style scoped>
.canvas-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animated-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  width: 100%;
  height: 100%;
}
</style>
