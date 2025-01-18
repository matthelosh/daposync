<script setup>
defineProps({ datas: Object });
defineEmits(["sinkron"]);
</script>

<template>
  <div>
    <h3 class="text-center pb-3 mb-4 border-b border-b-sky-500">
      Data Rombongan Belajar
    </h3>
    <table class="border w-full">
      <thead>
        <tr class="border-b">
          <th class="border-e">No</th>
          <th class="border-e">Nama</th>
          <th class="border-e">Tingkat</th>
          <th class="border-e">Wali Kelas</th>
          <th>Jumlah PD</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(rombel, r) in datas.rows">
          <tr class="hover:bg-sky-800">
            <td class="p-2 border-e text-center">{{ r + 1 }}</td>
            <td class="p-2 border-e text-center">{{ rombel.nama }}</td>
            <td class="p-2 border-e text-center">
              {{ rombel.tingkat_pendidikan_id }}
            </td>
            <td class="p-2 border-e text-left">{{ rombel.ptk_id_str }}</td>
            <td class="p-2 text-center">{{ rombel.anggota_rombel?.length }}</td>
          </tr>
        </template>
      </tbody>
    </table>
    <p class="text-center p-4">
      <button
        class="border border-green-400 text-green-400 px-3 py-2 mt-4 rounded hover:shadow-md hover:shadow-teal-500/50"
        @click="sinkron"
      >
        Kirim Ke Rapor
      </button>
    </p>
  </div>
</template>
