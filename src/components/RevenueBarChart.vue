<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import type { MonthMetric } from '@/types/metrics'

const props = defineProps<{
  months: MonthMetric[]
  selectedIndex: number
}>()

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.months.map((m) => m.month),
  datasets: [
    {
      label: 'Revenue',
      data: props.months.map((m) => m.revenue),
      backgroundColor: props.months.map((_, i) =>
        props.selectedIndex === -1 || props.selectedIndex === i
          ? '#26A69A'
          : 'rgba(38, 166, 154, 0.25)',
      ),
      borderRadius: 6,
      maxBarThickness: 42,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` $${Number(ctx.parsed.y).toLocaleString()}`,
      },
    },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#B0B0B0' } },
    y: {
      grid: { color: 'rgba(255,255,255,0.06)' },
      ticks: {
        color: '#B0B0B0',
        callback: (v) => `$${Number(v) / 1000}k`,
      },
    },
  },
}))
</script>

<template>
  <div class="chart-wrapper">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-wrapper {
  position: relative;
  height: 300px;
}
</style>
