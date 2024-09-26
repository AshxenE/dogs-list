<template>
  <div class="dog-card">
    <img :src="dog" class="dog-card__image" alt="Dog" loading="lazy"/>
    <p class="dog-card__name">{{ dogName }}</p>
    <img
        v-if="isFavorite"
        src="@/assets/images/icons/heartFill.svg"
        alt=""
        class="dog-card__like"
        @click="addDogToFavorites"
    />
    <img
        v-else
        src="@/assets/images/Shape.png"
        alt=""
        class="dog-card__like"
        @click="addDogToFavorites"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  dog: {
    type: String,
    default: '',
  },
});

const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const dogName = computed(()=>{
  return capitalizeFirstLetter(props.dog.split('/')[4].replace('-', ' '));
})

const isFavorite = ref(false);

const addDogToFavorites = () => {
  isFavorite.value = !isFavorite.value;

  try {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!Array.isArray(favorites)) {
      favorites = []; // Сбрасываем, если данные не являются массивом
    }

    if (isFavorite.value) {
      if (!favorites.includes(props.dog)) {
        favorites.push(props.dog);
      }
    } else {
      const index = favorites.indexOf(props.dog);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Ошибка при работе с избранным:', error);
    localStorage.setItem('favorites', JSON.stringify([props.dog]));
  }
};

onMounted(() => {
  try {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (Array.isArray(favorites) && favorites.includes(props.dog)) {
      isFavorite.value = true;
    }
  } catch (error) {
    console.error('Ошибка при чтении избранного:', error);
  }
});
</script>

<style lang="scss" scoped>
.dog-card {
  width: 367px;
  height: 290px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: all .3s ease-in-out;
  &__image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  &__name {
    position: absolute;
    bottom: 30px;
    color: #fff;
    font-size: 30px;
    right: 20px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.01em;
    text-align: left;
  }

  &__like {
    position: absolute;
    top: 20px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    left: 20px;
  }
  &:hover{
    transform: scale(1.05);
  }
}
</style>
