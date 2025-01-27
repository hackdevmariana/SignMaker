<template>
    <div class="d-flex align-items-center gap-2">
        <input type="color" v-model="textColor" class="form-control form-control-color border rounded-circle"
            title="Color del texto" />
        <input type="color" v-model="shadowColor" class="form-control form-control-color border rounded-circle"
            title="Color de la sombra" />
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAnimationStore } from '@/stores/useAnimationStore';

const animationStore = useAnimationStore();
const { textColor, shadowColor } = storeToRefs(animationStore);
</script>