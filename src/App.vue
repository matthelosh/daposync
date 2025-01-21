<script setup>
import {
  ref,
  onMounted,
  defineAsyncComponent,
  computed,
  onBeforeMount,
} from "vue";
import { Icon } from "@iconify/vue";
import SplashScreen from "./components/SplashScreen.vue";
const FormConfig = defineAsyncComponent(() =>
  import("./components/FormConfig.vue")
);
const items = ref(null);
const loading = ref(false);
const error = ref(null);
const params = ref(null);
const progress = ref(0);
const isInitializing = ref(true);
const initProgress = ref(0);
const formConfig = ref(null);
const komponen = ref(null);
const is = computed(() => {
  return defineAsyncComponent(() =>
    import(/* @vite-ignore */ "./components/" + komponen.value + ".vue")
  );
});
const showFormConfig = () => {
  formConfig.value = true;
};

const closeFormConfig = () => {
  formConfig.value = false;
};

const setting = ref({});
const checkConfig = () => {
  const ipDapodik = localStorage.getItem("ipDapodik");
  const npsn = localStorage.getItem("npsn");
  const tokenDapodik = localStorage.getItem("token");

  if (!ipDapodik || !npsn || !tokenDapodik) {
    showFormConfig();
  } else {
    setting.value = {
      ip: localStorage.getItem("ipDapodik"),
      npsn: localStorage.getItem("npsn"),
      token: localStorage.getItem("token"),
    };
  }
};

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

async function fetchData(endpoint, komp = null) {
  loading.value = true;
  komponen.value = komp;
  params.value = endpoint;
  try {
    const result = await window.api.invoke("fetch-data", {
      url: `http://${setting.value.ip}:5774/WebService/${endpoint}?npsn=${setting.value.npsn}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${setting.value.token}`,
        "Content-Type": "application/json",
      },
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

async function syncRapor(entitas = null) {
  // console.log(entitas);
  loading.value = true;
  try {
    const result = await window.api.invoke("sync-rapor", {
      url: `${import.meta.env.VITE_RAPOR_URL}/api/dapo/${entitas}/sync?npsn=${
        setting.value.npsn
      }`,
      method: "POST",
      body: JSON.stringify(items.value),
    });
    console.log(result);
    error.value = result.data?.error;
  } catch (err) {
    console.log(err);
  } finally {
    // alert("hi");
    loading.value = false;
  }
}

const isConnected = ref(false);

onMounted(async () => {
  await initializeApp();
  checkConfig();
});
</script>
<template>
  <SplashScreen v-if="isInitializing" :progress="initProgress" />
  <FormConfig v-if="formConfig" @close="closeFormConfig" />
  <div class="min-h-screen p-4 bg-gray-900 p-4 text-white relative">
    <h1 class="text-center text-lg tracking-wide">
      Sinkron Dapodik => Rapor SD
    </h1>
    <button
      class="absolute right-4 top-2 text-lime-300 flex items-center gap-1"
      @click="showFormConfig"
    >
      <Icon icon="mdi:cog-outline" />
      Setting
    </button>
    <nav class="flex items-center justify-center gap-3 my-4">
      <button
        :disabled="loading"
        class="px-4 py-2 border rounded hover:shadow-md hover:shadow-white"
        @click="fetchData('getSekolah', 'Sekolah')"
      >
        Data Sekolah
      </button>
      <button
        :disabled="loading"
        class="px-4 py-2 border rounded hover:shadow-md hover:shadow-white"
        @click="fetchData('getRombonganBelajar', 'Rombel')"
      >
        Data Rombel
      </button>
      <button
        :disabled="loading"
        class="px-4 py-2 border rounded hover:shadow-md hover:shadow-white"
        @click="fetchData('getGtk', 'Gtk')"
      >
        Data PTK
      </button>
      <button
        :disabled="loading"
        class="px-4 py-2 border rounded hover:shadow-md hover:shadow-white"
        @click="fetchData('getPesertaDidik', 'Siswa')"
      >
        Data Peserta Didik
      </button>
    </nav>
    <div class="content" v-if="!loading">
      <div
        class="alert text-orange-400 border p-4 border-orange-400 rounded"
        v-if="!komponen"
      >
        Ambil Data Dapodik
      </div>
      <div
        class="text-sky-400 border p-4 border-sky-400 rounded w-[96vw] overflow-x-auto"
        v-else
      >
        <component
          v-if="items"
          :is="is"
          :datas="items"
          @sinkron="syncRapor($event, entitas)"
        />
        <div v-else class="text-orange-300">
          <Icon icon="mdi:emoticon-sad-outline" class="mx-auto text-6xl my-4" />
          <p class="text-center">Maaf! Ada kendala koneksi dengan Dapodik.</p>
          <p class="text-center">
            Pastikan IP Dapodik, npsn dan token di Form Setting sesuai.
          </p>
        </div>
      </div>
    </div>
    <div v-else class="p-4 roounded border border-pink-400 text-white">
      <p>Loading.. Please wait!</p>
    </div>
    <div
      v-if="error"
      class="p-3 border mt-4 rounded border-red-300 text-red-300 text-center"
    >
      <Icon icon="mdi:alert-outline" class="text-4xl mx-auto" />
      <p>Sinkron Gagal</p>
      <p>Keterangan: "{{ error }}"</p>
    </div>
  </div>
</template>

<style scoped></style>
