<script setup>
defineProps({ datas: Object });
const emit = defineEmits(["sinkron"]);
</script>

<template>
  <div>
    <h3 class="text-center">Data GTK</h3>
    <table class="border w-full">
      <thead>
        <tr class="border-b">
          <th class="p-2 border-e">No</th>
          <th class="p-2 border-e">Nama</th>
          <th class="p-2 border-e">NIP</th>
          <th class="p-2 border-e">NUPTK</th>
          <th class="p-2 border-e">Jabatan</th>
          <th class="p-2 border-e">Pangkat</th>
          <th class="p-2 border-e">Tempat Lahir</th>
          <th class="p-2 border-e">Tanggal Lahir</th>
          <th class="p-2 border-e">Status Peg.</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(guru, g) in datas.rows">
          <tr class="hover:bg-sky-900">
            <td class="p-2 border-e text-center">{{ g + 1 }}</td>
            <td class="p-2 border-e text-left">{{ guru.nama }}</td>
            <td class="p-2 border-e text-center">{{ guru.nama }}</td>
            <td class="p-2 border-e text-center">{{ guru.nuptk }}</td>
            <td class="p-2 border-e text-center">
              {{ guru.jabatan_ptk_id_str }}
            </td>
            <td class="p-2 border-e text-center">
              {{ guru.pangkat_golongan_terakhir }}
            </td>
            <td class="p-2 border-e text-center">
              {{ guru.tempat_lahir }}
            </td>
            <td class="p-2 border-e text-center">
              {{ guru.tanggal_lahir }}
            </td>
            <td class="p-2 text-center">
              {{ guru.status_kepegawaian_id_str }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <p class="text-center p-4">
      <button
        class="border border-green-400 text-green-400 px-3 py-2 mt-4 rounded hover:shadow-md hover:shadow-teal-500/50"
        @click="emit('sinkron', 'guru')"
      >
        Kirim Ke Rapor
      </button>
    </p>
  </div>
</template>
