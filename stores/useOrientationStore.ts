import { defineStore } from 'pinia';

export const useOrientationStore = defineStore('orientation', {
  state: () => ({
    mode: 'horizontal', // Valor por defecto
    width: 1600,
    height: 900
  }),
  actions: {
    setMode(newMode: string) {
      this.mode = newMode;

      switch (newMode) {
        case 'horizontal':
          this.width = 1600;
          this.height = 900;
          break;
        case 'vertical':
          this.width = 506;
          this.height = 900;
          break;
        case 'cuadrado':
          this.width = 1080;
          this.height = 1080;
          break;
        case 'story':
          this.width = 750;
          this.height = 1334;
          break;
        default:
          console.warn(`Modo desconocido: ${newMode}`);
      }
    }
  }
});
