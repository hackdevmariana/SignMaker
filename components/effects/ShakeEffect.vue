<template>
    <button @click="applyEffect" class="btn btn-warning">Shake</button>
</template>

<script setup>
import gsap from 'gsap';
import { useEffectsStore } from '@/stores/useEffectsStore';

const effectsStore = useEffectsStore();

const applyEffect = () => {
    effectsStore.setEffect('shake');
    gsap.fromTo('canvas', { x: -10 }, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
};
</script>