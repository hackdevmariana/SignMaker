<template>
    <div>
      <!-- Botón para abrir el panel -->
      <button @click="togglePanel" class="btn btn-dark">🎨 Efectos</button>
  
      <!-- Menú lateral -->
      <div class="effects-panel" :class="{ open: isOpen }">
        <h5 class="text-white text-center">Selecciona Efectos</h5>
  
        <!-- Lista de efectos generada dinámicamente -->
        <div class="effect-list">
          <label v-for="effect in effectComponents" :key="effect.name">
            <input type="checkbox" v-model="selectedEffects" :value="effect.name" />
            {{ effect.label }}
          </label>
        </div>
  
        <!-- Botón para aplicar efectos -->
        <button @click="applyEffects" class="btn btn-success w-100 mt-3">▶️ Play</button>
  
        <!-- Botón para cerrar el panel -->
        <button @click="togglePanel" class="close-btn">❌</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useEffectsStore } from '@/stores/useEffectsStore';
  import gsap from 'gsap';
  
  // Stores
  const effectsStore = useEffectsStore();
  const isOpen = ref(false);
  const selectedEffects = ref([]);
  
  // Lista dinámica de efectos
  const effectComponents = ref([]);
  
  // Función para cargar automáticamente los efectos
  const loadEffects = async () => {
    const modules = import.meta.glob('@/components/effects/*.vue'); // Busca efectos en el directorio
    effectComponents.value = [];
  
    for (const path in modules) {
      const name = path.split('/').pop().replace('.vue', '');
      effectComponents.value.push({ name, label: name.replace(/([A-Z])/g, ' $1').trim() }); // Formatea nombres
    }
  };
  
  // Abrir/cerrar el menú lateral
  const togglePanel = () => {
    isOpen.value = !isOpen.value;
    gsap.to('.effects-panel', { x: isOpen.value ? 0 : '100%', duration: 0.5 });
  };
  
  // Aplicar efectos seleccionados
  const applyEffects = () => {
    effectsStore.setEffects(selectedEffects.value);
  };
  
  // Cargar efectos al montar el componente
  onMounted(loadEffects);
  </script>
  
  <style scoped>
  /* Estilos del menú lateral */
  .effects-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 250px;
    height: 100%;
    background: #222;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.3);
  }
  
  /* Clase para mostrar el menú */
  .effects-panel.open {
    transform: translateX(0);
  }
  
  .effect-list label {
    color: white;
    display: flex;
    gap: 10px;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  </style>
  