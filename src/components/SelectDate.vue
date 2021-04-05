<template>
  <div class="select-date">

    <div class="select-date__bar">
      <div class="select-date__year-month">{{ currentMonthName + ', ' + curYear }}</div>
      <div class="select-date__month-choosing">
        <button class="select-date__month-btn select-date__month-btn_prev"
          v-on:click="setPrevMonth"
        >Prev month</button>
        <button class="select-date__month-btn select-date__month-btn_next"
          v-on:click="setNextMonth"
        >Next month</button>
      </div>
    </div>

    <table class="select-date__table">
      <th class="select-date__th">
        <tr class="select-date__tr">
          <td class="select-date__td"
            v-for="(day, index) in weekDayNames"
            v-bind:key="index"
          >{{ day }}</td>
        </tr>
      </th>
      <tbody class="select-date__tbody">
        <tr class="select-date__tr"
          v-for="(week, index) in currentMonthWeeks"
          v-bind:key="index"
        >
          <td class="select-date__td"
            v-for="(day, index) in week"
            v-bind:key="index"
            v-bind:class="{
              'select-date__td_day': isDate(day), 
              'select-date__td_selected': isSelected(day)
            }"
            v-on:click="setSelectedDate(day)"
          >{{ isUndefined(day) ? ' ' : day.getDate() }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Date || undefined,
      default: undefined
    }
  },
  data() {
    return {
      currentMonth: new Date(),
      selectedDate: undefined,
      weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    }
  },
  computed: {
    currentMonthName() {
      return this.currentMonth.toLocaleDateString('ru', { month: 'long' })
    },
    curYear() {
      return this.currentMonth.getFullYear()
    },
    currentMonthWeeks() {
      // Dates filling

      const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0)

      const weeks = []
      let date

      for (let day = 1; day <= lastDay.getDate(); day++) {
        date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day)

        if (date.getDate() === 1 ||
          date.getDay() === 1) {
          weeks.push([])
        }

        weeks[weeks.length - 1].push(date)
      }

      // Plugs filling

      const emptyCellsCountOfFirstWeek = 7 - weeks[0].length
      const emptyCellsCountOfLastWeek = 7 - weeks[weeks.length - 1].length
      const plug = undefined

      for (let i = 0; i < emptyCellsCountOfFirstWeek ; i++) {
        weeks[0].unshift(plug)
      }

      for (let i = 0; i < emptyCellsCountOfLastWeek; i++) {
        weeks[weeks.length - 1].push(plug)
      }

      return weeks
    }
  },
  methods: {
    initSelectedDate() {
      if (this.isDate(this.modelValue) || this.modelValue === undefined) {
        return this.modelValue
      } else {
        return undefined
      }
    },
    initcurrentMonth() {
      if (this.selectedDate === undefined) return new Date()
      else return this.selectedDate
    },
    initData() {
      this.selectedDate = this.initSelectedDate()
      this.currentMonth = this.initcurrentMonth()
    },

    isDate(date) {
      return date instanceof Date
    },
    isUndefined(date) {
      return date === undefined
    },
    isSelected(date) {
      if (!this.isDate(date) ||
        this.selectedDate === undefined
      ) return false

      return this.datesAreEqual(this.selectedDate, date)
    },
    datesAreEqual(a, b) {
      return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
      )
    },
    
    setPrevMonth() {
      this.currentMonth = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() - 1,
        1
      )
    },
    setNextMonth() {
      this.currentMonth = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() + 1, 
        1
      )
    },
    setSelectedDate(date) {
      if (this.isUndefined(this.selectedDate)) {
        this.selectedDate = date
      }
      else if (this.datesAreEqual(this.selectedDate, date)) {
        this.selectedDate = undefined
      }
      else if (!this.datesAreEqual(this.selectedDate, date)) {
        this.selectedDate = date
      }

      this.$emit('update:modelValue', this.selectedDate)
    },
  },
  created() {
    this.initData()
  }
}
</script>

<style scoped>
.select-date {
  width: 250px;
  margin: 0 auto;
  padding: 16px;
  border: 2px solid #eee;
  border-radius: 8px;
}
.select-date__title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
  color: #0084E1;
}
.select-date__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 0 4px;
}
.select-date__year-month {
  font-size: 16px;
  font-weight: bold;
  color: #0084E1;
  user-select: none;
}
.select-date__year-month::first-letter {
  text-transform: uppercase;
}
.select-date__month-btn {
  display: inline-block;
  width: 25px;
  height: 25px;
  text-indent: -999px;
  background-color: rgba(255, 255, 255, 0);
  background-image: url(../assets/images/left-arrow.svg);
  background-position: 5px center;
  background-repeat: no-repeat;
  background-size: 12px 12px;
  border: none;
  border-radius: 50%;
  outline: none;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;
}
.select-date__month-btn:hover {
  background-color: #e4f4ff;
}
.select-date__month-btn_prev {
  margin-right: 8px;
}
.select-date__month-btn_next {
  transform: rotate(-180deg);
}
.select-date__table {
  width: 100%;
  border-collapse: collapse;
}
.select-date__tr {
  display: flex;
  justify-content: space-between;
  /* padding: 2px; */
}
.select-date__td {
  width: 25px;
  height: 25px;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
  vertical-align: center;
  border-radius: 50%;
  user-select: none;
}
.select-date__td_day {
  cursor: pointer;
  transition: background-color 150ms ease-in-out;
}
.select-date__td_day:hover {
  background-color: #eee;
}
.select-date__td_selected,
.select-date__td_selected:hover {
  color: #fff;
  background-color: #fc4e4e;
}
</style>
