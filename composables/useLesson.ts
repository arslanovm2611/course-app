import { type LessonWithPath } from "~/types/course";

export default async (chapterSlug: string, lessonSlug: string) =>
  useLessonWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );
