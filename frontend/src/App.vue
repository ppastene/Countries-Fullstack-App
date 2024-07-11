<template>
  <div>
    <section class="section">
      <h1 class="title">Countries table</h1>
    </section>
    <section class="section">
      <div class="containers">
        <CountriesTable />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CountriesTable from './components/CountriesTable.vue'
</script>

<style scoped>
  @import "https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css";
  @import "https://use.fontawesome.com/releases/v5.2.0/css/all.css";
</style>
