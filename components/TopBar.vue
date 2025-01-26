<template>
    <div class="bg-gray-900 text-white px-6 py-2 flex items-center shadow-lg">
      <!-- Logo o Nombre -->
      <h1 class="text-xl font-bold tracking-wide text-blue-400">SignMaker</h1>
  
      <!-- Espaciador flexible para mantener los elementos alineados a la derecha -->
      <div class="flex-grow"></div>
  
      <!-- Contenedor de Componentes -->
      <div class="flex items-center space-x-3">
        <Phrase />
        <!-- Aquí se pueden agregar más componentes en el futuro -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import Phrase from './topbar/Phrase.vue';
  
  onMounted(() => {
    console.log("✅ TopBar.vue montado correctamente.");
  });
  </script>
  