<script setup>
const course = useCourse();
const route = useRoute();

definePageMeta({
  middleware: [
    function ({ params }, from) {
      const course = useCourse();

      const chapter = course.chapters.find(
        (chapter) => chapter.slug === params.chapterSlug
      );

      if (!chapter) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Chapter not found",
          })
        );
      }

      const lesson = chapter.lessons.find(
        (lesson) => lesson.slug === params.lessonSlug
      );

      if (!lesson) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Lesson not found",
          })
        );
      }
    },
    "auth",
  ],
});

const chapter = course.chapters.find(
  (chapter) => chapter.slug === route.params.chapterSlug
);

const lesson = chapter.lessons.find(
  (lesson) => lesson.slug === route.params.lessonSlug
);

const title = ` ${lesson.title} - ${chapter.title} `;

useHead({
  title,
});

const progress = useLocalStorage("progress", []);
const isLessonCompleted = computed(() => {
  if (!progress.value[chapter.number - 1]) {
    return false;
  }
  if (!progress.value[chapter.number - 1][lesson.number - 1]) {
    return false;
  }
  return progress.value[chapter.number - 1][lesson.number - 1];
});

const toggleComplete = () => {
  console.log(progress.value);
  if (!progress.value[chapter.number - 1]) {
    progress.value[chapter.number - 1] = [];
  }

  progress.value[chapter.number - 1][lesson.number - 1] =
    !isLessonCompleted.value;
};
</script>
<template>
  <div>
    <h1 class="text-gray-500 mb-1 font-bold">
      LESSON{{ chapter.number }} - {{ lesson.number }}
    </h1>

    <h2 class="my-0">{{ lesson.title }}</h2>
    <div class="flex flex-col gap-4 mb-8 mt-2">
      <div class="flex flex-row gap-4">
        <NuxtLink
          v-if="lesson.sourceUrl"
          :to="lesson.sourceUrl"
          class="text-gray-500"
          >Download Source Code</NuxtLink
        >
        <NuxtLink
          v-if="lesson.downloadUrl"
          :to="lesson.downloadUrl"
          class="text-gray-500"
          >Download Video</NuxtLink
        >
      </div>
      <VideoPlayer v-if="lesson.videoId" :video="lesson" />
    </div>
    <p class="my-4">{{ lesson.text }}</p>
    <LessonCompleteButton
      :model-value="isLessonCompleted"
      @update:model-value="toggleComplete"
    />
  </div>
</template>

<style scoped></style>
