import { type CourseMeta } from "~/types/course";
export default async () => useLessonWithCache<CourseMeta>(`/api/course/meta`);
