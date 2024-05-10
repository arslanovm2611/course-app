<script setup>
const route = useRoute();
const course = await useCourse();

const lesson = await useLesson(
  route.params.chapterSlug,
  route.params.lessonSlug
);

definePageMeta({
  middleware: [
    async function (to, from) {
      const course = await useCourse();
      const chapter = course.value.chapters.find(
        (chapter) => chapter.slug === to.params.chapterSlug
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
        (lesson) => lesson.slug === to.params.lessonSlug
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

const chapter = computed(() =>
  course.value.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  )
);

const title = computed(
  () => ` ${lesson.value?.title} - ${course.value.title} `
);
useHead({
  title,
});

const progress = useLocalStorage("progress", []);
const isLessonCompleted = computed(() => {
  if (!progress.value[chapter.number - 1]) {
    return false;
  }
  if (!progress.value[chapter.number - 1][lesson.value.number - 1]) {
    return false;
  }
  return progress.value[chapter.number - 1][lesson.value.number - 1];
});

const toggleComplete = () => {
  if (!progress.value[chapter.number - 1]) {
    progress.value[chapter.number - 1] = [];
  }

  progress.value[chapter.number - 1][lesson.value.number - 1] =
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
      <VideoPlayer v-if="lesson.videoId" :video="lesson" />
    </div>
    <p class="my-4">{{ lesson.text }}</p>
    <LessonCompleteButton
      :model-value="isLessonCompleted"
      @update:model-value="toggleComplete"
    />
  </div>
</template>
