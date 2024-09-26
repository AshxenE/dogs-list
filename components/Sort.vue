<template>
  <div :class="['sort', { sorted: selected }]">
    <div class="sort__title" @click="isOpenSort = !isOpenSort">
      <span>Породы</span>
      <img :class="['sort__icon', { rotate: isOpenSort }]" src="@/assets/images/arrowDown.png" alt="" />
    </div>
    <div class="selected" v-if="selected">
      {{ selected }}
    </div>
    <ToggleSwitch v-else/>
  </div>
  <Transition name="fade">
    <div>
      {{route.fullPath === '/'}}
      <div v-show="isOpenSort" :class="['all-dogs',{active: route.fullPath === '/'}]" @click="router.push('/')">
        Все пёсели
      </div>
      <div class="sort-items" v-show="isOpenSort">
        <div v-for="(breeds, key) in breedsItems" class="sort-items__breeds">
          <p class="sort-items__breeds-title">{{key}}</p>
          <div v-for="breed in breeds" :class="['sort-items__breeds-breed', {active: selected === breed}]" @click="goToBreed(breed)">
            {{breed}}
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  breeds:  {
    type: Object,
    default: ()=>{}
  },
  selected:{
    type: String,
    default: ''
  }
})

const isOpenSort = ref(false)
const router = useRouter()
const route = useRoute()

const groupByFirstCharacter = (obj) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const firstChar = key.charAt(0).toUpperCase();

      if (!result[firstChar]) {
        result[firstChar] = [];
      }
      result[firstChar].push(key);
    }
  }
  return result;
}
const breedsItems = groupByFirstCharacter(props.breeds)

const goToBreed = (breed: any) => {
   router.push(`/breed/${breed}`)
}
</script>

<style scoped lang="scss">
.sort {
  width: -webkit-fill-available;
  display: flex;
  justify-content: space-between;
  padding: 35px 60px;
  align-items: center;
  background-color: #222;
  &__title{
    padding: 6px 0;
    width: max-content;
    height: 20px;
    color: #FFFFFF;
    display: flex;
    gap: 12px;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px dashed white;
  }
  &__icon{
    max-width: 9px;
    transition: all .3s ease-in-out;
  }
  &__favourites{
    height: 28px;
    font-size: 16px;
    color: #626262;
    display: flex;
    gap: 12px;
    align-items: center;
  }
  &__toggle{
    width: 29px;
    height: 14.5px;
  }
}
.sort-items{
  display: flex;
  align-items: center;
  column-gap: 40px;
  row-gap: 18px;
  flex-wrap: wrap;
  padding: 35px 60px;
  background-color: #222;
  &__breeds {
    display: flex;
    align-items: center;
    gap: 12px;
    &-title {
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      letter-spacing: 0.01em;
      text-align: left;
      color: #626262;
    }
    &-breed {
      display: flex;
      align-items: center;
      justify-content: center;
      width: max-content;
      height:24px;
      padding: 4px 12px 4px 12px;
      border-radius: 20px;
      border: 1px solid #626262;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0.01em;
      text-align: left;
      color: #626262;
      text-transform: capitalize;
      cursor: pointer;
      transition: all .3s ease-in-out;

      &:hover {
        border-color: #3C59F0;
        color: #3C59F0;
      }
    }
  }
}
.rotate{
  transform: rotate(180deg);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(30px);
}
.selected{
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    height:24px;
    padding: 4px 12px 4px 12px;
    border-radius: 20px;
    border: 1px solid #3C59F0;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.01em;
    text-align: left;
    text-transform: capitalize;
    cursor: pointer;
    transition: all .3s ease-in-out;
    color: #3C59F0;
}
.sorted {
  justify-content: flex-start;
  gap: 12px;
}
.all-dogs {
  margin: 0 60px;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content:center;
  height: 24px;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #626262;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #626262;
  cursor: pointer;
  &:hover {
    border-color: #3C59F0;
    color: #3C59F0;
  }
}

.active {
  border-color: #3C59F0;
  color: #3C59F0;
}
</style>