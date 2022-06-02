<script setup>
  import { ref } from 'vue';
  import { useFlip } from './hooks/useFlip';

  const data = ref(Array.from({ length: 10 }).map((v, k) => k));
  const listRef = ref(null);
  const { flip } = useFlip(listRef);

  function handleAdd() {
    data.value.unshift(data.value.length);
    flip();
  }

  function shuffle() {
    const list = data.value;

    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i - 1));

      const temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }

    data.value = list;

    flip();
  }
</script>

<template>
  <div class="actions">
    <button @click="handleAdd">添 加</button>
    <button @click="shuffle">洗 牌</button>
  </div>

  <div class="flip-box" ref="listRef">
    <div class="flip-item" v-for="item in data" :key="item">{{ item }}</div>
  </div>
</template>

<style>
  .flip-box {
    width: 400px;
    display: flex;
    flex-wrap: wrap;
  }

  .flip-item {
    width: 80px;
    height: 40px;
    border: 1px solid;
    margin: 6px;
  }
</style>
