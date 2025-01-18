<script setup>
defineProps({ datas: Object });
</script>

<template>
  <div>
    <h3 class="text-center">Data GTK</h3>
    <table class="border w-full"></table>
    {{ datas }}
  </div>
</template>
