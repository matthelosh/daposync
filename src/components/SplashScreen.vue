<script setup>
defineProps({
  progress: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
    <div class="w-72 text-center">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Daposync</h1>
        <p class="text-gray-400">Loading ...</p>
      </div>

      <div class="w-full bg-gray-400 rounded-full h-2 5 mb-4 overflow-hidden">
        <div
          class="bg-blue-500 h-full transition-all duration-300 ease-out"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
      <p class="text-gray-400 text-sm">{{ progress }}%</p>
    </div>
  </div>
</template>
