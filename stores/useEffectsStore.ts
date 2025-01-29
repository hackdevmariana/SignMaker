// 📂 stores/useEffectsStore.ts
import { defineStore } from 'pinia';

export const useEffectsStore = defineStore('effects', {
  state: () => ({
    activeEffects: [] // Ahora es un array
  }),
  actions: {
    setEffects(effects: string[]) {
      this.activeEffects = effects;
    }
  }
});
