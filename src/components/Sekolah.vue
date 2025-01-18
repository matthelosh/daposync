<script setup>
defineProps({ datas: Object });
defineEmits(["sinkron"]);
</script>

<template>
  <div>
    <h3 class="text-center text-xl pb-2 border-b border-b-sky-500 mb-4">
      Data Sekolah
    </h3>
    <table class="w-full">
      <tbody>
        <tr>
          <td>NPSN</td>
          <td>:</td>
          <td>{{ datas.rows.npsn }}</td>
        </tr>
        <tr>
          <td>NSS</td>
          <td>:</td>
          <td>{{ datas.rows.nss }}</td>
        </tr>
        <tr>
          <td>Nama Sekolah</td>
          <td>:</td>
          <td>{{ datas.rows.nama }}</td>
        </tr>
        <tr>
          <td>Alamat</td>
          <td>:</td>
          <td>
            <p>
              {{ datas.rows.alamat_jalan }}, {{ datas.rows.dusun }}, RT.
              {{ datas.rows.rt }} RW. {{ datas.rows.rw }}
              {{ datas.rows.desa_kelurahan }}
            </p>
          </td>
        </tr>
        <tr>
          <td>Kecamatan</td>
          <td>:</td>
          <td>{{ datas.rows.kecamatan }}</td>
        </tr>
        <tr>
          <td>Kabupaten/Kota</td>
          <td>:</td>
          <td>{{ datas.rows.kabupaten_kota }}</td>
        </tr>
        <tr>
          <td>Kode Pos</td>
          <td>:</td>
          <td>{{ datas.rows.kode_pos }}</td>
        </tr>
        <tr>
          <td>Telp</td>
          <td>:</td>
          <td>{{ datas.rows.nomor_telepon }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>:</td>
          <td>{{ datas.rows.email }}</td>
        </tr>
        <tr>
          <td>Website</td>
          <td>:</td>
          <td>{{ datas.rows.website }}</td>
        </tr>
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
