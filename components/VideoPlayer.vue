<script setup>
defineProps({
  video: {
    lesson: Object,
  },
});
</script>

<template>
  <div>
    <iframe
      width="510"
      height="265"
      :src="`https://player.vimeo.com/video/${video.videoId}`"
      title="Video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped></style>
