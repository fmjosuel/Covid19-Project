<template>
  <div>
    <!--row open-->
    <div class="row">
      <div class="col-xl-8 col-md-12 col-lg-8">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">COVID-19 : RDC DATA</h4>
            <h6 class="card-subtitle">
              Last updated at : <b>{{ lastUpdatedAt }}</b>
            </h6>
          </div>
          <div class="card-body pt-0">
            <div id="echart2" class="h-220 overflow-hidden "></div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-12 col-lg-4">
        <div class="card">
          <div class="card-body">
            <canvas id="pieChart" class="chartsh1 chart-dropshadow"></canvas>
          </div>
        </div>
      </div>
    </div>
    <!--end row-->

    <!--row open-->
    <div v-if="lastSix && chartData" class="row">
      <div class="col-md-12 col-lg-4 col-xl-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">COVID-19 : DRC daily new cases</h4>
            <h6 class="card-subtitle">Last 6 Days</h6>
          </div>
          <div class="card-body p-0">
            <div class="browser-stats">
              <ul class="list-unstyled">
                <li
                  v-for="(lastItem, i) in lastSix"
                  :key="`last-${i}`"
                  class="pl-4 pr-4 pt-3 pb-3 border-bottom"
                >
                  <i class="fa fa-bar-chart text-orange mr-2"></i>
                  <b>{{ lastItem.Date }}</b>
                  <div class="pull-right">
                    <span class="text-info">
                      <small>New cases</small>
                      <b>{{ lastItem['Daily new cases'] }}</b>
                      <i class="fa fa-level-up"></i>
                    </span>
                    <span class="text-danger">
                      <small>Deaths</small>
                      <b>{{ lastItem['Daily new deaths'] }}</b>
                      <i class="fa fa-level-down"></i>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-8 col-xl-8">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">COVID-19 : DRC growth factor</h4>
            <h6 class="card-subtitle">Last {{ `${chartData.length} days` }}</h6>
          </div>
          <div class="card-body">
            <div
              id="echart1"
              class="chartsh1 chart-dropshadow overflow-hidden"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!--end row-->
  </div>
</template>
<script>
import Chart from 'chart.js'
import echarts from 'echarts'
import coreMixins from '@/mixins/core'

export default {
  mixins: [coreMixins],
  props: {
    chartData: {
      type: Array,
      default: null
    }
  },
  computed: {
    lastSix() {
      const last6Record = this.chartData
        .slice(this.chartData.length - 6)
        .reverse()
      return last6Record
    },
    circleChart() {
      const lastRecord = this.chartData[this.chartData.length - 1]
      return {
        labels: ['Confirmed Cases', 'Active cases', 'Deaths', 'Recovered'],
        values: [
          lastRecord['Confirmed Cases'],
          lastRecord['Active cases'],
          lastRecord.Death,
          lastRecord.Recovery
        ]
      }
    },
    mainChart() {
      const dates = this.chartData.map((e) => e.Date)
      const days = []

      const data = {
        confirmed: {
          name: 'Confirmed Cases',
          type: 'line',
          smooth: true,
          data: [],
          color: ['#FF8645']
        },
        active: {
          name: 'Active Cases',
          type: 'line',
          smooth: true,
          data: [],
          color: ['#2C80FF']
        },
        deaths: {
          name: 'Deaths',
          type: 'line',
          smooth: true,
          data: [],
          color: ['#F24224']
        },
        recovered: {
          name: 'Recovered',
          type: 'line',
          smooth: true,
          data: [],
          color: ['#0BD65F']
        },
        days: {
          name: 'Daily new cases',
          type: 'bar',
          data: []
        },
        growth: {
          name: 'Growth Factor',
          type: 'line',
          smooth: true,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          data: []
        }
      }

      this.chartData.map((e) => {
        days.push(e.Day)
        const growth = Number.parseFloat(e['Growth Factor'])
        data.confirmed.data.push(e['Confirmed Cases'])
        data.active.data.push(e['Active cases'])
        data.deaths.data.push(e.Death)
        data.recovered.data.push(e.Recovery)
        data.days.data.push(e['Daily new cases'])
        data.growth.data.push(growth.toFixed(2))
      })
      return {
        dates,
        days,
        data
      }
    },
    secondaryChart() {
      const { days: mainDays, data: mainData } = this.mainChart
      const { growth } = mainData
      return {
        days: mainDays,
        data: { growth }
      }
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    hasGrow(i) {
      // console.log(i, lastItems)
      // if (this.lastSix) {
      //   console.log(i, this.lastSix[i])
      //   console.log(i - 1, this.lastSix[i - 1])
      //   // return (
      //   //   this.lastSix[i]['Daily new cases'] >
      //   //   this.lastSix[i + 1]['Daily new cases']
      //   // )
      // }
      return true
    },
    initCharts() {
      if (process.browser) {
        const vm = this
        /* ----Echart2---- */
        const mainData = { ...vm.mainChart.data }
        delete mainData.days
        delete mainData.growth

        const mainChartData = Object.values(mainData)

        const chart2 = document.getElementById('echart2')
        const barChart2 = echarts.init(chart2)
        const option2 = {
          legend: {
            show: true
          },
          grid: {
            top: '10%',
            right: '0',
            bottom: '40',
            left: '25'
          },
          tooltip: {
            show: true,
            showContent: true,
            alwaysShowContent: true,
            triggerOn: 'mousemove',
            trigger: 'axis',
            axisPointer: {
              label: {
                show: false
              }
            }
          },
          xAxis: {
            data: vm.mainChart.dates,
            axisLine: {
              lineStyle: {
                color: 'rgba(161, 161, 161,0.3)'
              }
            },
            axisLabel: {
              fontSize: 10,
              color: '#bbc1ca',
              show: true,
              // height: 80,
              rotate: 45,
              rotateAlways: true
            }
          },
          yAxis: {
            splitLine: {
              lineStyle: {
                color: 'rgba(161, 161, 161,0.3)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(161, 161, 161,0.3)'
              }
            },
            axisLabel: {
              fontSize: 10,
              color: '#bbc1ca'
            }
          },
          series: mainChartData,
          color: ['#ea5d33', '#b03cd5', '#8645ff']
        }
        barChart2.setOption(option2)

        /* echart2 */
        const chartdata = Object.values(vm.secondaryChart.data)

        const chart = document.getElementById('echart1')
        const barChart = echarts.init(chart)

        const option = {
          grid: {
            top: '6',
            right: '0',
            bottom: '17',
            left: '25'
          },
          xAxis: {
            data: vm.secondaryChart.days,
            axisLine: {
              lineStyle: {
                color: 'rgba(161, 161, 161,0.3)'
              }
            },
            axisLabel: {
              fontSize: 10,
              color: '#bbc1ca'
            }
          },
          tooltip: {
            show: true,
            showContent: true,
            alwaysShowContent: true,
            triggerOn: 'mousemove',
            trigger: 'axis',
            axisPointer: {
              label: {
                show: false
              }
            }
          },
          yAxis: {
            splitLine: {
              lineStyle: {
                color: 'rgba(161, 161, 161,0.3)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(161, 161, 161,0.3)'
              }
            },
            axisLabel: {
              fontSize: 10,
              color: '#bbc1ca'
            }
          },
          series: chartdata,
          color: ['#8645ff', '#45beff']
        }
        barChart.setOption(option)

        /* ---ChartJS (#pieChart)--- */
        const ctx = document.getElementById('pieChart')

        // eslint-disable-next-line no-unused-vars
        const myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            datasets: [
              {
                data: vm.circleChart.values,
                backgroundColor: ['#ff8645', '#2C80FF', '#F24224', '#0BD65F'],
                hoverBackgroundColor: [
                  '#ff8645',
                  '#2C80FF',
                  '#F24224',
                  '#0BD65F'
                ],
                borderColor: 'transparent'
              }
            ],
            labels: vm.circleChart.labels
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontColor: '#a1a1a1'
              }
            }
          }
        })
      }
    }
  }
  // head() {
  //   return {
  //     script: [
  //       { src: 'dev/plugins/Chart.js/dist/Chart.min.js', body: true },
  //       { src: 'dev/plugins/Chart.js/dist/Chart.extension.js', body: true },
  //       { src: 'dev/plugins/echarts/echarts.js', body: true }
  //     ]
  //   }
  // }
}
</script>
