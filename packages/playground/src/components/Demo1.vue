<script setup lang="ts">
import { ref } from "vue";
import { motion } from "@animemotion/vue";

const key = ref(0);

function refreshAnimation() {
  key.value += 1;
}
</script>

<template>
  <button style="margin-bottom: 20px" @click="refreshAnimation">
    刷新动画
  </button>

  <motion.div
    :key="key"
    :initial="{ scale: 0 }"
    :animate="{ rotate: 180, scale: 1, backgroundColor: 'rgb(255, 255, 255)' }"
  />

  <motion.section
    :key="key"
    :initial="{ scale: 0 }"
    :animate="{ rotate: 180, scale: 1, backgroundColor: 'rgb(255, 255, 255)' }"
  />
</template>

<style>
body {
  padding: 100px;
  background-color: black;
}

div,
section {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>
