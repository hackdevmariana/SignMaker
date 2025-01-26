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
import { ref, watch, onMounted } from 'vue';

// Definir variable reactiva
const phrase = ref("");

// Observar cambios en la variable y mostrarlos en consola
watch(phrase, (newValue) => {
  console.log("📝 Texto ingresado:", newValue);
});

// Mensaje cuando el componente se monta
onMounted(() => {
  console.log("✅ Phrase.vue montado correctamente.");
});
</script>
