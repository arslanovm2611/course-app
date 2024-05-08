import courseData from "./courseData";
import {
  type Lesson,
  type LessonWithPath,
  type Chapter,
  type Course,
} from "~/types/course";

export const useCourse = (): Course => {
  const chapters: Chapter[] = courseData.chapters.map((chapter: Chapter) => {
    const lessons: LessonWithPath[] = chapter.lessons.map((lesson: Lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    }));

    return {
      ...chapter,
      lessons,
    };
  });
  return {
    ...courseData,
    chapters,
  };
};
