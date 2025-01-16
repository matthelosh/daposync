<script setup>
import { ref, onMounted } from "vue";
import SplashScreen from "./components/SplashScreen.vue";
const items = ref(null);
const loading = ref(false);
const error = ref(null);
const params = ref(null);
const progress = ref(0);
const isInitializing = ref(true);
const initProgress = ref(0);

const initializeApp = async () => {
  const steps = [
    { name: "Loading configurations", weight: 20 },
    { name: "Initializing database", weight: 30 },
    { name: "Loading user preferences", weight: 25 },
    { name: "Preparing application", weight: 25 },
  ];

  let currentProgress = 0;
  for (const step of steps) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    currentProgress += step.weight;
    initProgress.value = currentProgress;
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  isInitializing.value = false;
};

async function fetchData(endpoint) {
  loading.value = true;
  params.value = endpoint;
  try {
    const result = await window.api.invoke("fetch-data", {
      url: `http://192.168.1.11:5774/WebService/${endpoint}?npsn=20518848`,
      method: "GET",
    });
    if (result.success) {
      items.value = result.data;
    } else {
      error.value = result.error;
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function syncRapor() {
  loading.value = true;
  try {
    const result = await window.api.invoke("sync-rapor", {
      url: "https://raporsd.test/api/dapo/sekolah/sync",
      method: "POST",
      body: JSON.stringify(items.value),
    });
    console.log(result.data);
  } catch (err) {
    console.log(err);
  } finally {
    // alert("hi");
    loading.value = false;
  }
}

onMounted(() => {
  // fetchData();
  initializeApp();
});
</script>
<template>
  <SplashScreen v-if="isInitializing" :progress="initProgress" />
  <div class="min-h-screen p-4 bg-gray-900 p-4 text-white">
    <h1 class="text-center text-lg tracking-wide">
      Sinkron Dapodik => Rapor SD
    </h1>
    <nav class="flex items-center justify-center gap-3 my-4">
      <button
        :disabled="loading"
        class="px-4 py-2 border rounded hover:shadow-md hover:shadow-white"
        @click="fetchData('getSekolah')"
      >
        Data Sekolah
      </button>
      <button
        :disabled="loading"
        class="px-4 py-2 border rounded hover:shadow-md hover:shadow-white"
        @click="fetchData('getRombonganBelajar')"
      >
        Data Rombel
      </button>
      <button
        :disabled="loading"
        class="px-4 py-2 border rounded hover:shadow-md hover:shadow-white"
        @click="fetchData('getPTK')"
      >
        Data PTK
      </button>
      <button
        :disabled="loading"
        class="px-4 py-2 border rounded hover:shadow-md hover:shadow-white"
        @click="fetchData('getPesertaDidik')"
      >
        Data Peserta Didik
      </button>
    </nav>
    <div class="content" v-if="!loading">
      <div
        class="alert text-orange-400 border p-4 border-orange-400 rounded"
        v-if="!items"
      >
        Ambil Data Dapodik
      </div>
      <div class="alert text-sky-400 border p-4 border-sky-400 rounded" v-else>
        <p>{{ items }}</p>
        <p class="text-center p-4">
          <button
            class="border border-green-400 text-green-400 px-3 py-2 mt-4 rounded hover:shadow-md hover:shadow-teal-500/50"
            :disabled="loading"
            @click="syncRapor()"
          >
            Kirim Ke Rapor
          </button>
        </p>
      </div>
    </div>
    <div v-else class="p-4 roounded border border-pink-400 text-white">
      <p>Loading.. Please wait!</p>
    </div>
  </div>
</template>

<style scoped></style>
