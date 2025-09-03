<script setup>

import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import NavExterna from "@/components/NavExterna.vue";
</script>

<template>
  <header>
    <div>

      <NavExterna></NavExterna>

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
    </div>
  </header>

  <RouterView />
</template>
