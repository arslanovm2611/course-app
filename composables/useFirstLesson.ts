type FirstLesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  videoId: number;
  text: string;
  path: string;
};

export const useFirstLesson = (): FirstLesson => {
  const course = useCourse();
  const firstLesson = course.chapters[0].lessons[0];
  return firstLesson;
};
