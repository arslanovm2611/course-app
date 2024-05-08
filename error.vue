<script setup>
const error = useError();
console.log("error handled");
const handleError = () => {
  clearError({
    redirect:
      "/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3",
  });
};
</script>
<template>
  <NuxtLayout>
    <div class="prose">
      <h1>Dang</h1>
      <p>Something went wrong.</p>
      <p>Sorry for that</p>
      <p>{{ error.message }}</p>
      <p>
        Go to
        <a
          @click="handleError"
          class="hover:cursor-pointer underline font-medium"
        >
          first lesson</a
        >.
      </p>
    </div>
  </NuxtLayout>
</template>
