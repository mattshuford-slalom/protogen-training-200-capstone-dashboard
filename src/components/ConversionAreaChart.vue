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
      label: 'Conversion Rate',
      data: props.months.map((m) => m.conversion),
      borderColor: '#7E57C2',
      backgroundColor: 'rgba(126, 87, 194, 0.25)',
      pointBackgroundColor: props.months.map((_, i) =>
        props.selectedIndex === i ? '#FFFFFF' : '#7E57C2',
      ),
      pointRadius: props.months.map((_, i) => (props.selectedIndex === i ? 6 : 3)),
      borderWidth: 2,
      tension: 0.35,
      fill: true,
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
        label: (ctx) => ` ${Number(ctx.parsed.y).toFixed(1)}%`,
      },
    },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#B0B0B0' } },
    y: {
      grid: { color: 'rgba(255,255,255,0.06)' },
      ticks: {
        color: '#B0B0B0',
        callback: (v) => `${Number(v).toFixed(1)}%`,
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
  height: 260px;
}
</style>
