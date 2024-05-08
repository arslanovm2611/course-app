<template>
  <div class="prose w-full h-full my-auto gap-10 flex flex-col items-center">
    <h1 class="font-bold">Log in to {{ title }}</h1>
    <button
      @click="login"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Log in with Github
    </button>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const { title } = useCourse();

const login = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.error(error);
  }
};
</script>
