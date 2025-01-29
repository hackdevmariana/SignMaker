<!-- 📂 components/effects/SpinEffect.vue -->
<script setup>
import { useEffectsStore } from '@/stores/useEffectsStore';
import gsap from 'gsap';

const effectsStore = useEffectsStore();

const applyEffect = () => {
  effectsStore.setEffects(['spin']);
  gsap.to('canvas', { rotation: 360, duration: 1 });
};
</script>

<template>
  <button @click="applyEffect" class="btn btn-primary">Spin Effect</button>
</template>
