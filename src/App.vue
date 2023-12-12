<template>
    <h1>
      Moving App <font-awesome-icon :icon="['fas', 'truck-moving']"/>
    </h1> 
  <nav>
    <router-link to="/todo">
      <font-awesome-icon :icon="['fas', 'clipboard-list']"/> todo
    </router-link> | 
    <router-link to="/tobuy">
      <font-awesome-icon :icon="['fas', 'bag-shopping']"/> tobuy
    </router-link>
  </nav>
  <router-view/>
</template>

<style>
h1 {
  padding-top: 20px;
}
nav {
  padding-bottom: 30px;
}

nav a {
  font-weight: bold;
  color: gray;
}

nav a.router-link-exact-active:first-child {
  color: #000066;
}

nav a.router-link-exact-active:last-child {
  color: #FF0099;
}
</style>
