<template>
  <div class="loader">
    <span class="loader__dot"></span>
    <span class="loader__dot"></span>
    <span class="loader__dot"></span>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.loader {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.loader__dot {
  width: 8px;
  height: 8px;
  border: 2px solid #ccc;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

@keyframes bounce {
  to {
    transform: scale(1.5);
    opacity: 0.5;
  }
}

.loader__dot:nth-child(1) {
  animation-delay: 0s;
}
.loader__dot:nth-child(2) {
  animation-delay: 0.2s;
}
.loader__dot:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
