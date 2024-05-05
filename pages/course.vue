<script setup>
const { chapters, title } = useCourse();
</script>

<template>
  <div class="prose mb-12">
    <h1>
      <span class="font-medium">
        <span class="font-bold">{{ title }}</span>
      </span>
    </h1>
  </div>

  <div class="flex flex-row justify-center flex-grow">
    <div class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col">
      <h3 class="font-medium">Chapters</h3>

      <div>
        <ul
          v-for="chapter in chapters"
          :key="chapter.slug"
          class="space-y-1 mb-4 flex flex-col"
        >
          <li class="">{{ chapter.title }}</li>
          <NuxtLink
            v-for="(lesson, index) in chapter.lessons"
            :to="lesson.path"
            :key="lesson.slug"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
            :class="{
              'text-blue-500': lesson.slug === $route.params.lessonSlug,
            }"
          >
            <span class="text-gray-500">{{ index + 1 }}.</span
            >{{ lesson.title }}</NuxtLink
          >
        </ul>
      </div>
    </div>

    <div class="prose p-12 bg-white rounded-md w-[65ch]">
      <NuxtPage />
    </div>
  </div>
</template>
