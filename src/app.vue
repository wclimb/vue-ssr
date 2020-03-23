<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/about" exact>
          about
        </router-link>
        <router-link to="/test" exact>
          test
        </router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="stylus"></style>
