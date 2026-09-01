<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import type { MonthMetric } from '@/types/metrics'

const props = defineProps<{
  months: MonthMetric[]
  selectedIndex: number
}>()

const chartData = computed<ChartData<'line'>>(() => ({
  labels: props.months.map((m) => m.month),
  datasets: [
    {
      label: 'Visitors',
      data: props.months.map((m) => m.visitors),
      borderColor: '#5C6BC0',
      backgroundColor: 'rgba(92, 107, 192, 0.15)',
      pointBackgroundColor: props.months.map((_, i) =>
        props.selectedIndex === i ? '#FFFFFF' : '#5C6BC0',
      ),
      pointRadius: props.months.map((_, i) => (props.selectedIndex === i ? 6 : 3)),
      borderWidth: 2,
      tension: 0.35,
      fill: false,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${Number(ctx.parsed.y).toLocaleString()} visitors`,
      },
    },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#B0B0B0' } },
    y: {
      grid: { color: 'rgba(255,255,255,0.06)' },
      ticks: {
        color: '#B0B0B0',
        callback: (v) => `${Number(v) / 1000}k`,
      },
    },
  },
}))
</script>

<template>
  <div class="chart-wrapper">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-wrapper {
  position: relative;
  height: 300px;
}
</style>
