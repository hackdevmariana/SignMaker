<template>
    <div class="d-flex gap-2">
        <FadeInEffect />
        <ShakeEffect />
        <ZoomEffect />
        <TypewriterEffect />
    </div>
</template>

<script setup>
import FadeInEffect from '@/components/effects/FadeInEffect.vue';
import ShakeEffect from '@/components/effects/ShakeEffect.vue';
import ZoomEffect from '@/components/effects/ZoomEffect.vue';
import TypewriterEffect from '@/components/effects/TypewriterEffect.vue';
</script>