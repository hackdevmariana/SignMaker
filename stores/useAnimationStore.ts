import { defineStore } from 'pinia';

export const useAnimationStore = defineStore('animation', {
  state: () => ({
    duration: 3, // Duración en segundos
    background: '#000000', // Color de fondo
    textColor: '#FFFFFF', // Color del texto
    shadowColor: '#000000', // Color de la sombra del texto
    font: 'Arial', // Fuente predeterminada
  }),
  actions: {
    setDuration(time: number) {
      this.duration = time;
    },
    setBackground(color: string) {
      this.background = color;
    },
    setTextColor(color: string) {
      this.textColor = color;
    },
    setShadowColor(color: string) {
      this.shadowColor = color;
    },
    setFont(font: string) {
      this.font = font;
    }
  }
});
