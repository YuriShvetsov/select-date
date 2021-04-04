<template>
  <div class="container">

    <select-date v-model="date"></select-date>

    <div class="date-view" v-show="isDate(date)">{{ dateToString(date) }}</div>
  
  </div>
</template>

<script>
import SelectDate from './SelectDate.vue'

export default {
  components: {
    'select-date': SelectDate
  },
  data() {
    return {
      date: new Date()
    }
  },
  methods: {
    isDate(date) {
      return (date instanceof Date)
    },
    dateToString(date) {
      if (date === undefined) return

      if (!this.isDate(date)) {
        console.warn('Date is not correctly, this type is', typeof date)
        return
      }

      return date.toLocaleDateString('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
}
.date-view {
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
</style>
