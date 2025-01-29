// 📂 stores/useEffectsStore.ts
import { defineStore } from 'pinia';

export const useEffectsStore = defineStore('effects', {
  state: () => ({
    activeEffects: [] as string[] // Ahora aseguramos que es un array de strings
  }),
  actions: {
    setEffects(effects: string[]) {
      this.activeEffects = effects.map(e =>
        e.replace('Effect', '') // Elimina "Effect"
          .replace(/([A-Z])/g, '-$1') // Convierte camelCase en kebab-case
          .replace(/^-/, '') // Elimina guion al inicio si existe
          .toLowerCase()
      );
    }
  }
});
