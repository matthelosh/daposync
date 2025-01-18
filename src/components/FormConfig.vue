<script setup>
import { onMounted, ref } from "vue";

const emit = defineEmits(["close"]);
const ipDapodik = ref(null);
const npsn = ref(null);
const token = ref(null);
const message = ref("");
const error = ref({});

const simpan = async () => {
  if (npsn.value == null || npsn.value == "") {
    error.value.npsn = "Isi NPSN Sekolah";
    return false;
  }
  if (token.value == null || token.value == "") {
    error.value.token = "Isi Token Web Service";
    return false;
  }
  if (ipDapodik.value == null || ipDapodik.value == "") {
    error.value.ipDapodik = "Isi IP Dapodik";
    return false;
  }
  localStorage.setItem("ipDapodik", ipDapodik.value);
  localStorage.setItem("npsn", npsn.value);
  localStorage.setItem("token", token.value);

  message.value = "Setting disimpan";
  await window.api.reload();
  setTimeout(() => {
    emit("close");
  }, 1000);
};

onMounted(() => {
  ipDapodik.value = localStorage.getItem("ipDapodik") ?? null;
  token.value = localStorage.getItem("token") ?? null;
  npsn.value = localStorage.getItem("npsn") ?? null;
});
</script>

<template>
  <div
    class="fixed w-screen h-screen flex items-center justify-center bg-sky-900 bg-opacity-50 backdrop-blur z-50 text-white relative"
  >
    <div>
      <div v-if="Object.keys(error).length > 0" class="text-red-400 mb-4">
        Error: <br />
        {{ error }}
      </div>
      <div class="form-config p-4 rounded border w-[400px]">
        <h3 class="text-center text-lg tracking-widest font-bold mb-2">
          Konfigurasi web Service Dapodik
        </h3>

        <label for="ipDapodik">
          IP Dapodik:
          <input
            type="text"
            placeholder="Masukkan Alamat IP Dapodik"
            class="p-2 w-full rounded mt-1 mb-3"
            v-model="ipDapodik"
            required
          />
        </label>
        <label for="ipDapodik">
          NPSN:
          <input
            type="text"
            placeholder="Masukkan NPSN Sekolah"
            class="p-2 w-full rounded mt-1 mb-3"
            v-model="npsn"
            required
          />
        </label>
        <label for="token">
          Token Web Service:
          <input
            type="text"
            placeholder="Masukkan Token Web Service"
            class="p-2 w-full rounded mt-1 mb-1"
            v-model="token"
            required
          />
        </label>
        <div class="flex items-center justify-between w-full">
          <button
            class="py-2 px-3 border mt-4 rounded mx-auto text-red-300 border-red-300"
            @click="emit('close')"
          >
            Batal
          </button>
          <button
            class="py-2 px-3 border mt-4 rounded mx-auto text-lime-300 border-lime-300"
            @click="simpan"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
input {
  background: rgba(20, 72, 96, 0.223);
  border: 1px solid white;
  color: white;
  outline-color: transparent;
}
</style>
