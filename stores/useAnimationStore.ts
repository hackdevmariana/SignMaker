import { defineStore } from 'pinia';

export const useAnimationStore = defineStore('animation', {
  state: () => ({
    textColor: '#FFFFFF',
    shadowColor: '#000000',
    backgroundColor1: '#000000',
    backgroundColor2: '#FFFFFF',
    backgroundType: 'solid', // "solid", "linear", "radial", etc.
    linearDirection: 'to bottom', // Dirección para degradado lineal
    font: 'Roboto', // Fuente predeterminada
    fontSize: 30 // Tamaño de fuente predeterminado
  }),
  actions: {
    setTextColor(color: string) {
      this.textColor = color;
    },
    setShadowColor(color: string) {
      this.shadowColor = color;
    },
    setBackgroundColor1(color: string) {
      this.backgroundColor1 = color;
    },
    setBackgroundColor2(color: string) {
      this.backgroundColor2 = color;
    },
    setBackgroundType(type: string) {
      this.backgroundType = type;
    },
    setLinearDirection(direction: string) {
      this.linearDirection = direction;
    },
    setFont(font: string) {
      this.font = font;
    },
    setFontSize(size: number) {
      this.fontSize = size;
    }
  }
});
