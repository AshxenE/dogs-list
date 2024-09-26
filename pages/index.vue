<template>
  <div class="dogs">
    <Sort :breeds="breeds" />
    <DogList :dogs="sortedDogs" />
    <Loader v-if="isLoading"/>
    <div ref="loadMoreTrigger" class="dogs__load-more-trigger"></div>
    <div class="scroll" v-if="isScrollVisible" @click="scrollHandler">
      <img src="@/assets/images/icons/scroll.svg" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDogsStore } from "~/store/store";

const dogsStore = useDogsStore();
const dogs = ref([]);
const loadMoreTrigger = ref(null);
const isLoading = ref(false)
const isScrollVisible = ref(false);

const fetchDogs = async () => {
  isLoading.value = true;
  await dogsStore.getDogsList();
  dogs.value = [...dogs.value, ...dogsStore.dogsList];
  isLoading.value = false;
};

const {data: breeds} = await useAsyncData(
    'breeds',
    () => {
      return dogsStore.getBreedsList();
    }
)

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await fetchDogs();
    }
  });

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
};

const extractBreed = (url) => {
  const breedMatch = url.match(/breeds\/([^/]+)\//);
  return breedMatch ? breedMatch[1] : '';
};

const sortByAlfa = computed(() => dogsStore.getSortByAlfa);

const sortedDogs = computed(() => {
  if (sortByAlfa.value) {
    return JSON.parse(JSON.stringify(dogs.value)).sort((a, b) => {
      const breedA = extractBreed(a).toLowerCase();
      const breedB = extractBreed(b).toLowerCase();

      return breedA.localeCompare(breedB);
    });
  }else {
    return dogs.value
  }
})

const scrollHandler = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
const checkScroll = () => {
  isScrollVisible.value = window.scrollY > 200;
};

onMounted(async () => {
  window.addEventListener('scroll', checkScroll);
  await fetchDogs();
  setupIntersectionObserver();
});

onUnmounted(()=>{
  window.removeEventListener('scroll', checkScroll);
  dogsStore.setSortByAlfa(false)
})
</script>

<style lang="scss" scoped>
.dogs {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__load-more-trigger {
    height: 1px;
    background: transparent;
  }
  .scroll{
    position: fixed;
    width: 55px;
    height: 55px;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 100px;
    bottom: 100px;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover{
      transform: scale(1.05);
    }
  }
}
</style>
