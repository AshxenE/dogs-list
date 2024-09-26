<template>
  <div class="toggle-switch">
    <label class="toggle-switch__label">Сортировка по алфавиту</label>
    <div class="toggle-switch__switcher">
      <input type="checkbox" id="toggle" v-model="isChecked" @change="toggleSwitch" />
      <label class="toggle-switch__slider" for="toggle"></label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDogsStore } from "~/store/store";

const dogsStore = useDogsStore();
const isChecked = ref(false);

const toggleSwitch = () => {
  dogsStore.setSortByAlfa(isChecked.value);
};
</script>

<style scoped lang="scss">
.toggle-switch {
  display: flex;
  align-items: center;

  .toggle-switch__label {
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.01em;
    text-align: right;
    color: #626262;
    margin-right: 10px;
  }
  .toggle-switch__switcher {
    position: relative;
    display: inline-block;
    width: 29px;
    height: 14.5px;
  }

  input {
    display: none;
  }

  .toggle-switch__slider {
    position: relative;
    display: block;
    width: 29px;
    height: 14.5px;
    background-color: transparent;
    border: 1px solid #626262;
    border-radius: 9px;
    transition: 0.4s;
    cursor: pointer;

    &::before {
      position: absolute;
      content: "";
      width: 9.67px;
      height: 9.67px;
      left: 3px;
      top: 2px;
      background: #626262;
      border-radius: 50%;
      transition: 0.4s;
    }
  }

  input:checked + .toggle-switch__slider {
    border-color: white;
  }

  input:checked + .toggle-switch__slider::before {
    transform: translateX(13px);
    background-color: white;
  }
}
</style>
