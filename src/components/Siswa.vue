<script setup>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({ datas: Object });
const emit = defineEmits(["sinkron"]);
const currentPage = ref(1);
const perPage = ref(10);
const pages = computed(() =>
  Math.ceil(props.datas.rows.length / perPage.value)
);
const siswas = computed(() => {
  const items = props.datas.rows;
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return items.slice(start, end);
});
</script>

<template>
  <div>
    <h3 class="text-center">Data Peserta Didik</h3>
    <table class="border w-full">
      <thead>
        <tr class="border-b">
          <th class="p-2 border-e">No</th>
          <th class="p-2 border-e">NIK</th>
          <th class="p-2 border-e">NISN</th>
          <th class="p-2 border-e">Nama</th>
          <th class="p-2 border-e">JK</th>
          <th class="p-2 border-e">Tempat Lahir</th>
          <th class="p-2 border-e">Tanggal Lahir</th>
          <th class="p-2 border-e">Agama</th>
          <th class="p-2 border-e">No. HP</th>
          <th class="p-2 border-e">Rombel/Kelas</th>
          <th class="p-2 border-e">Ayah</th>
          <th class="p-2 border-e">Pekerjaan Ayah</th>
          <th class="p-2 border-e">Ibu</th>
          <th class="p-2 border-e">Pekerjaan Ibu</th>
          <th class="p-2 border-e">Wali</th>
          <th class="p-2 border-e">Pekerjaan Wali</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(siswa, s) in siswas">
          <tr class="hover:bg-sky-900 border-b">
            <td class="text-center border-e p-2">
              {{ perPage * currentPage + (s + 1) }}
            </td>
            <td class="text-center border-e p-2">
              {{ siswa.nik }}
            </td>
            <td class="text-center border-e p-2">{{ siswa.nisn }}</td>
            <td class="text-center border-e p-2">{{ siswa.nama }}</td>
            <td class="text-center border-e p-2">{{ siswa.jenis_kelamin }}</td>
            <td class="text-center border-e p-2">{{ siswa.tempat_lahir }}</td>
            <td class="text-center border-e p-2">{{ siswa.tanggal_lahir }}</td>
            <td class="text-center border-e p-2">{{ siswa.agama_id_str }}</td>
            <td class="text-center border-e p-2">
              {{ siswa.nomor_telepon_seluler }}
            </td>
            <td class="text-center border-e p-2">
              {{ siswa.nama_rombel }}
            </td>
            <td class="text-center border-e p-2">
              {{ siswa.nama_ayah }}
            </td>
            <td class="text-center border-e p-2">
              {{ siswa.pekerjaan_ayah_id_str }}
            </td>
            <td class="text-center border-e p-2">
              {{ siswa.nama_ibu }}
            </td>
            <td class="text-center border-e p-2">
              {{ siswa.pekerjaan_ibu_id_str }}
            </td>
            <td class="text-center border-e p-2">
              {{ siswa.nama_wali }}
            </td>
            <td class="text-center border-e p-2">
              {{ siswa.pekerjaan_wali_id_str }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div>
      <span>Halaman: {{ currentPage }} / {{ pages }}</span> |
      <span>Total: {{ datas.rows.length }}</span>
      <div class="flex items-center">
        <button
          class="text-white p-2 border-sky-500 border rounded disabled:bg-slate-400"
          :disabled="currentPage <= 0"
          @click="currentPage--"
        >
          <Icon icon="mdi:chevron-left" class="text-2xl" />
        </button>
        <button
          v-for="(page, p) in pages"
          class="text-white py-2 px-3 border-sky-500 border rounded"
          :class="currentPage === page ? 'bg-sky-700' : ''"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <button
          class="text-white p-2 border-sky-500 border rounded disabled:bg-slate-400"
          :disabled="currentPage >= pages"
          @click="currentPage++"
        >
          <Icon icon="mdi:chevron-right" class="text-2xl" />
        </button>
      </div>
    </div>
    <p class="text-center p-4">
      <button
        class="border border-green-400 text-green-400 px-3 py-2 mt-4 rounded hover:shadow-md hover:shadow-teal-500/50"
        @click="emit('sinkron', 'siswa')"
      >
        Kirim Ke Rapor
      </button>
    </p>
  </div>
</template>
