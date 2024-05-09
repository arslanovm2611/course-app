<script setup>
const course = await useCourse();
</script>

<template>
  <div>
    <div class="mb-4 flex justify-between items-center w-full">
      <h1 class="text-3xl font-bold">
        {{ course.title }}
      </h1>

      <UserCard />
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col"
      >
        <h3 class="font-bold text-xl">Chapters</h3>

        <div>
          <ul
            v-for="chapter in course.chapters"
            :key="chapter.slug"
            class="space-y-1 mt-6 flex flex-col"
          >
            <p class="font-medium">
              {{ chapter.title }}
            </p>
            <li class="ml-2 flex flex-col gap-2 text-sm">
              <NuxtLink
                v-for="(lesson, index) in chapter.lessons"
                :to="'/' + lesson.path"
                :key="lesson.slug"
                class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
                :class="{
                  'text-blue-500': lesson.slug === $route.params.lessonSlug,
                }"
              >
                <span class="text-gray-500">{{ index + 1 }}.</span
                >{{ lesson.title }}</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="prose p-12 bg-white rounded-md w-[65ch]">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
