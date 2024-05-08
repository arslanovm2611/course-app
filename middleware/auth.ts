export default defineNuxtRouteMiddleware(({ params, path }, from) => {
  const user = useSupabaseUser();
  if (params.chapterSlug === "1-chapter-1" || user.value) {
    return;
  }
  return navigateTo("/login");
});
