<script setup lang="ts">
  const layout = "default";
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
* {
  padding: 0;
  margin: 0;
  font-family: 'IBM Plex Sans', sans-serif;
}
body {
  background-color: #222;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>