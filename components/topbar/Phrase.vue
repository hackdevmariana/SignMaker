<template>
  <ClientOnly>
    <div>
      <input 
        v-model="phrase"
        type="text"
        placeholder="Inserta una frase o palabra para mostrar"
        class="p-2 menu-input"
      >
    </div>
  </ClientOnly>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePhraseStore } from '@/stores/usePhraseStore';

// Acceder al store
const phraseStore = usePhraseStore();
const { text: phrase } = storeToRefs(phraseStore); // Hacer reactivo el estado

// Observar cambios y mostrarlos en consola
watch(phrase, (newValue) => {
  console.log("📝 Texto almacenado en Pinia:", newValue);
});
</script>
