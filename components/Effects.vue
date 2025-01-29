<template>
  <div>
    <!-- Botón para abrir el panel -->
    <button @click="togglePanel" class="btn btn-dark">🎨 Efectos</button>

    <!-- Menú lateral -->
    <div class="effects-panel" :class="{ open: isOpen }">
      <h5 class="text-white text-center">Selecciona Efectos</h5>

      <!-- Lista de efectos generada dinámicamente -->
      <div class="effect-list">
        <label v-for="effect in availableEffects" :key="effect">
          <input type="checkbox" v-model="selectedEffects" :value="effect" />
          {{ formatEffectName(effect) }}
        </label>
      </div>

      <!-- Lista de efectos seleccionados -->
      <div v-if="selectedEffects.length" class="selected-effects">
        <h6 class="text-white text-center mt-3">Efectos Aplicados:</h6>
        <ul>
          <li v-for="effect in selectedEffects" :key="effect" class="text-white">
            {{ formatEffectName(effect) }}
          </li>
        </ul>
      </div>

      <!-- Botón para aplicar efectos -->
      <button @click="applyEffects" class="btn btn-success w-100 mt-3">▶️ Play</button>

      <!-- Botón para cerrar el panel -->
      <button @click="togglePanel" class="close-btn">❌</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useEffectsStore } from '@/stores/useEffectsStore';
import gsap from 'gsap';

const effectsStore = useEffectsStore();
const isOpen = ref(false);
const selectedEffects = ref([]);

// Lista de efectos disponibles (nuevos efectos añadidos)
const availableEffects = ref([
  "fade-in",
  "shake",
  "zoom",
  "spin",
  "bounce",
  "blur-in",
  "flicker",
  "skew-in",
  "wave",
  "neon-glow",
  "rotate-in",
  "stretch",
  "drop-in",
  "slide-in",
  "expand",
  "flash",
  "pop",
  "fade-up",
  "random-letters"
]);


// Formatear nombres para UI (Ejemplo: "fade-in" → "Fade In")
const formatEffectName = (effect) => {
  return effect.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
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
</script>

<style scoped>
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

.effects-panel.open {
  transform: translateX(0);
}

.effect-list label {
  color: white;
  display: flex;
  gap: 10px;
}

.selected-effects {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
}

.selected-effects ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.selected-effects li {
  font-size: 14px;
}
</style>
