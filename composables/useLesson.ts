export default async (chapterSlug: string, lessonSlug: string) => {
  const { data, error } = useFetch(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Cannot fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
    });
  }

  return data;
};
