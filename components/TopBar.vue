<template>
    <div class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 class="text-lg font-bold">SignMaker</h1>
        <div class="flex space-x-4">
            <ClientOnly>
                <Phrase />
            </ClientOnly>
            <!-- <Text /> -->
            <Duration />
            <Play />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Phrase from '@/components/topbar/Phrase.vue';
import Duration from '@/components/topbar/Duration.vue';
import Play from '@/components/topbar/Play.vue';

onMounted(() => {
    console.log("✅ TopBar.vue montado correctamente.");
});
</script>