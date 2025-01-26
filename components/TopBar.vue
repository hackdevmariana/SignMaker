<template>
    <div class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 class="text-lg font-bold">SignMaker</h1>
        <div class="flex space-x-4">
               
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Phrase from '@/components/topbar/Phrase.vue';
onMounted(() => {
    console.log("✅ TopBar.vue montado correctamente.");
});
</script>