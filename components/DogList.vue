<template>
  <div class="dog-list">
    <DogCard v-for="(dog, i) in dogs" :dog="dog" :key="i" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  dogs:{
    type: Array,
    default: ()=>[]
  }
})
</script>

<style lang="scss" scoped>
.dog-list {
    display: grid;
    max-width: max-content;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
</style>
