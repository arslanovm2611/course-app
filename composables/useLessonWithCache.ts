import { StorageSerializers } from "@vueuse/core";

export default async <T>(url: string) => {
  const lesson = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object,
  });
  if (!lesson.value) {
    const { data, error } = await useFetch<T>(url);

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Cannot fetch lesson from ${url}`,
      });
    }
    lesson.value = data.value as T;
  }
  return lesson;
};
