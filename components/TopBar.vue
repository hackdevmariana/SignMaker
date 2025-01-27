<template>
    <nav class="navbar navbar-dark bg-dark px-3">
      <div class="container-fluid d-flex align-items-center justify-content-between">
        <a class="navbar-brand text-primary fw-bold" href="#">SignMaker</a>
        <div class="d-flex align-items-center gap-3">
          <Phrase />
          <Duration />
          <ColorsBackground />
          <ColorsTexts />
          <Fonts />
          <Orientation /> <!-- Nuevo selector de orientación -->
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import Phrase from './topbar/Phrase.vue';
  import Duration from './topbar/Duration.vue';
  import ColorsBackground from './topbar/ColorsBackground.vue';
  import ColorsTexts from './topbar/ColorsTexts.vue';
  import Fonts from './topbar/Fonts.vue';
  import Orientation from './topbar/Orientation.vue';
  </script>
  