export default {
  computed: {
    lastRecord() {
      return this.chartData[this.chartData.length - 1]
    },
    lastUpdatedAt() {
      return this.lastRecord ? this.lastRecord.Date : 'now'
    }
  }
}
