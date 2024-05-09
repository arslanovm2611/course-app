<template>
  <div>
    <NuxtLink :to="firstlesson.path" class="underline font-medium">
      Go to first lesson
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const firstlesson = await useFirstLesson();
</script>
