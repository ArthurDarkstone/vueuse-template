<script setup lang="ts">
import { useCounter } from 'utils-vue'

const { count, inc, dec } = useCounter()
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="inc()">
      Increment
    </button>
    <button @click="dec()">
      Decrement
    </button>
  </div>
</template>
