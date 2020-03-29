<template>
  <div class="container app-content">
    <section class="section">
      <!--page-header open-->
      <div class="page-header">
        <h3>COVID-19 DRC</h3>
      </div>
      <!--page-header closed-->

      <!--row open-->
      <div v-if="lastRecord" class="row">
        <div class="col-sm-6 col-lg-6 col-xl-3">
          <div class="card">
            <div class="card-body iconfont text-left">
              <h6 class="mb-3">CONFIRMED CASES</h6>
              <h4 class="mb-1 text-dark">
                {{ lastRecord['Confirmed Cases'] }}
              </h4>
              <p class="mb-2 text-muted">
                Last updated at : <b>{{ lastUpdatedAt }}</b>
              </p>
              <div class="progress h-6">
                <div
                  class="progress-bar bg-primary w-100 "
                  role="progressbar"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-6 col-xl-3">
          <div class="card">
            <div class="card-body iconfont text-left">
              <h6 class="mb-3">DEATHS</h6>
              <h4 class="mb-1 text-dark">
                {{ lastRecord.Death }}
              </h4>
              <p class="mb-2 text-muted">
                Last updated at : <b>{{ lastUpdatedAt }}</b>
              </p>
              <div class="progress h-6">
                <div
                  class="progress-bar bg-secondary w-100 "
                  role="progressbar"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-6 col-xl-3">
          <div class="card">
            <div class="card-body iconfont text-left">
              <h6 class="mb-3">RECOVERED</h6>
              <h4 class="mb-1 text-dark">
                {{ lastRecord.Recovery }}
              </h4>
              <p class="mb-2 text-muted">
                Last updated at : <b>{{ lastUpdatedAt }}</b>
              </p>
              <div class="progress h-6">
                <div
                  class="progress-bar bg-info w-100 "
                  role="progressbar"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-6 col-xl-3">
          <div class="card">
            <div class="card-body iconfont text-left">
              <h6 class="mb-3">ACTIVE CASES</h6>
              <h4 class="mb-1 text-dark">
                {{ lastRecord['Active cases'] }}
              </h4>
              <p class="mb-2 text-muted ">
                Last updated at : <b>{{ lastUpdatedAt }}</b>
              </p>
              <div class="progress h-6">
                <div
                  class="progress-bar bg-pink w-100 "
                  role="progressbar"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end row-->
      <client-only placeholder="Loading...">
        <DataCharts v-if="chartData.length > 0" :chart-data="chartData" />
        <DataTable v-if="tableData.length > 0" :table-data="tableData" />
      </client-only>
    </section>
    <div v-if="loading" class="card">
      <div class="card-body text-center">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import DataCharts from '@/components/DataCharts'
import DataTable from '@/components/DataTable'
import coreMixins from '@/mixins/core'

export default {
  components: { DataTable, DataCharts },
  mixins: [coreMixins],
  data() {
    return {
      chartData: [],
      tableData: [],
      loading: false
    }
  },
  mounted() {
    if (process.browser) {
      // const file = new File([new Blob([this.axiosResponse])], 'covid.xlsx')
      // console.log(file)
      this.parseExcelData()
    }
  },
  methods: {
    fixdata(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        )
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    async parseExcelData() {
      this.loading = true
      const vm = this
      const excelDataAPI = process.env.DATA_URL
      const response = await this.$axios.$get(excelDataAPI, {
        responseType: 'blob'
      })
      const file = await new File([new Blob([response])], 'covid.xlsx')
      const rABS = false // Read the file as a binary string

      const reader = new FileReader()
      FileReader.prototype.readAsBinaryString = function(file) {
        let binary = ''
        const rABS = false // Read the file as a binary string
        let wb // Read completed data
        let parsedData
        const reader = new FileReader()
        reader.onload = function(e) {
          const bytes = new Uint8Array(reader.result)
          const length = bytes.byteLength
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }

          if (rABS) {
            wb = XLSX.read(btoa(vm.fixdata(binary)), {
              // Manual conversion
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }

          parsedData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
            raw: false
          })
          // outdata is read data (without header rows or headers, the header will be the subscript of the object)
          // Data can be processed here.

          vm.parseData(parsedData)

          vm.loading = false
          return 'loaded'
        }
        reader.readAsArrayBuffer(file)
      }
      if (rABS) {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsBinaryString(file)
      }
    },
    parseData(parsedData) {
      parsedData.map((cellData) => {
        this.tableData.unshift(cellData)
        this.chartData.push(cellData)
      })
    }
  },
  head() {
    return {
      title: 'DASHBOARD'
    }
  }
}
</script>
<style scoped>
.bg-primary {
  background-color: #ff8645 !important;
}
.bg-info {
  background-color: #0bd65f !important;
}
.bg-secondary {
  background-color: #f24224 !important;
}
.bg-pink {
  background-color: #2c80ff !important;
}
</style>
