<template>
  <header class="header">
    <NuxtLink to="/" class="header__title">ПЁСЕЛЬ</NuxtLink>
    <NuxtLink to="/favorites" class="header__favorites" active-class="active">
      Избранные пёсели
      <img src="@/assets/images/Shape.png" alt="heart" />
    </NuxtLink>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 35px 60px;
  background-color: #151419;
  align-items: center;
  &__title {
    font-size: 24px;
    color: #3C59F0;
    text-decoration: none;
  }
  &__favorites {
    font-size: 16px;
    color: #626262;
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    img {
      width: 16px;
    }
  }
}
.active{
  color: white;
}
</style>
