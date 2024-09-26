<template>
  <div class="favorite-dogs">
    <DogList :dogs="favoriteDogs" />
  </div>
</template>

<script setup lang="ts">
const favoriteDogs = ref([])

onMounted(()=>{
  favoriteDogs.value = JSON.parse(localStorage.getItem('favorites'))
})
</script>

<style lang="scss" scoped>
.favorite-dogs {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
