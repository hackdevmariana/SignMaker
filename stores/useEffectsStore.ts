// 📂 stores/useEffectsStore.ts
import { defineStore } from 'pinia';

export const useEffectsStore = defineStore('effects', {
  state: () => ({
    activeEffect: 'fade-in', // Efecto predeterminado
  }),
  actions: {
    setEffect(effect) {
      this.activeEffect = effect;
    }
  }
});
