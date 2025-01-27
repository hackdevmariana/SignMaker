<template>
  <div>
    <input 
      v-model="phrase"
      type="text"
      placeholder="Escribe algo..."
      class="form-control form-control-sm"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePhraseStore } from '@/stores/usePhraseStore';

// Acceder al store
const phraseStore = usePhraseStore();
const { text: phrase } = storeToRefs(phraseStore);

// Depuración: mostrar cambios en la consola
watch(phrase, (newValue) => {
  console.log("📢 Texto actualizado:", newValue);
});
</script>
