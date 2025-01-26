import { defineStore } from 'pinia';

export const usePhraseStore = defineStore('phrase', {
  state: () => ({
    text: ''
  }),
  actions: {
    setText(newText: string) {
      this.text = newText;
    }
  }
});
