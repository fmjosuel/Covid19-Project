<template>
  <div class="row">
    <div class="col-md-12 col-lg-12 col-xl-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">COVID-19 : DRC TIME SERIES DATA</h4>
          <h6 class="card-subtitle">
            Last updated at : <b>{{ lastUpdatedAt }}</b>
          </h6>
        </div>
        <div class="card-body">
          <div class="table-responsive mb-0">
            <table class="table table-bordered text-nowrap mb-0">
              <thead>
                <tr>
                  <th
                    v-for="(tableTitle, i) in tableHeader"
                    :key="`header-${i}`"
                  >
                    {{ tableTitle }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tableValue, i) in tableBody" :key="i">
                  <td v-for="(actualValue, j) in tableValue" :key="j">
                    {{ actualValue }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: null
    }
  },
  computed: {
    tableHeader() {
      const arr = []
      if (this.tableData && this.tableData[0]) {
        const firstItem = this.tableData[0]
        for (const key in firstItem) {
          if (key.startsWith('Confirmed')) {
            arr.push('Confirmed')
          } else if (key.startsWith('Active')) {
            arr.push('Active')
          } else {
            arr.push(key)
          }
        }
      }
      return arr
    },
    tableBody() {
      const arr = []
      const data = this.tableData
      if (data) {
        for (const key in data) {
          arr.push(data[key])
        }
      }
      return arr
    },
    lastUpdatedAt() {
      return this.tableBody[0].Date
    }
  },
  mounted() {}
}
</script>
