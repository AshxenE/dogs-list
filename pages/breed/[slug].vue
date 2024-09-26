<template>
  <div class="breed-dogs">
    <Sort :breeds="dogsStore.breeds" :selected="route.params.slug"/>
    <DogList :dogs="breedDogs"/>
  </div>
</template>

<script setup lang="ts">
import { useDogsStore } from "~/store/store";

const dogsStore = useDogsStore();
const route = useRoute()

const {data: breedDogs} = await useAsyncData(
    'breedsListItem',
    () => {
      return dogsStore.getBreedsListItem(route.params.slug);
    }
)
</script>

<style scoped lang="scss">
.breed-dogs {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>