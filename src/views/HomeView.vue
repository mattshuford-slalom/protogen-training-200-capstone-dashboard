<script setup lang="ts">
import { computed, ref } from 'vue'
import metricsData from '@/data/metrics.json'
import type { MetricsData, MonthMetric } from '@/types/metrics'
import MetricCard from '@/components/MetricCard.vue'
import RevenueBarChart from '@/components/RevenueBarChart.vue'
import VisitorsLineChart from '@/components/VisitorsLineChart.vue'
import ConversionAreaChart from '@/components/ConversionAreaChart.vue'

const data = metricsData as MetricsData
const months = data.months

const selected = ref<string>('All')
const monthOptions = ['All', ...months.map((m) => m.month)]

const selectedIndex = computed(() =>
  selected.value === 'All' ? -1 : months.findIndex((m) => m.month === selected.value),
)

const fmtCurrency = (n: number) => `$${Math.round(n).toLocaleString()}`
const fmtNumber = (n: number) => Math.round(n).toLocaleString()
const fmtPercent = (n: number) => `${n.toFixed(1)}%`

const pctChange = (cur: number, prev: number) =>
  prev === 0 ? 0 : ((cur - prev) / prev) * 100

// Returns [current, previous] month pair driving the card values and deltas.
function pair(): { cur: MonthMetric | undefined; prev: MonthMetric | undefined } {
  if (selectedIndex.value === -1) {
    return { cur: months[months.length - 1], prev: months[months.length - 2] }
  }
  return { cur: months[selectedIndex.value], prev: months[selectedIndex.value - 1] }
}

function delta(field: keyof MonthMetric): number | null {
  const { cur, prev } = pair()
  if (!cur || !prev) return null
  return pctChange(Number(cur[field]), Number(prev[field]))
}

const isAll = computed(() => selectedIndex.value === -1)

const totals = computed(() => ({
  revenue: months.reduce((s, m) => s + m.revenue, 0),
  visitors: months.reduce((s, m) => s + m.visitors, 0),
  orders: months.reduce((s, m) => s + m.orders, 0),
  conversion: months.reduce((s, m) => s + m.conversion, 0) / months.length,
}))

const current = computed(() => months[selectedIndex.value])

const deltaLabel = computed(() => (isAll.value ? 'vs prev. month' : 'vs prev. month'))

const cards = computed(() => {
  const c = current.value
  return [
    {
      title: 'Revenue',
      value: fmtCurrency(isAll.value || !c ? totals.value.revenue : c.revenue),
      icon: 'mdi-currency-usd',
      color: 'primary',
      delta: delta('revenue'),
    },
    {
      title: 'Visitors',
      value: fmtNumber(isAll.value || !c ? totals.value.visitors : c.visitors),
      icon: 'mdi-account-group',
      color: 'secondary',
      delta: delta('visitors'),
    },
    {
      title: 'Conversion',
      value: fmtPercent(isAll.value || !c ? totals.value.conversion : c.conversion),
      icon: 'mdi-swap-horizontal',
      color: 'accent',
      delta: delta('conversion'),
    },
    {
      title: 'Orders',
      value: fmtNumber(isAll.value || !c ? totals.value.orders : c.orders),
      icon: 'mdi-cart',
      color: 'success',
      delta: delta('orders'),
    },
  ]
})
</script>

<template>
  <v-app-bar flat color="surface" border>
    <v-app-bar-title>
      <span class="font-weight-bold">Analytics Dashboard</span>
      <span class="text-medium-emphasis text-body-2 ml-2">{{ data.year }}</span>
    </v-app-bar-title>

    <template #append>
      <v-select
        v-model="selected"
        :items="monthOptions"
        density="compact"
        variant="outlined"
        hide-details
        prepend-inner-icon="mdi-calendar-month"
        style="min-width: 160px"
        class="mr-2"
      />
    </template>
  </v-app-bar>

  <v-main>
    <v-container class="py-6" fluid>
      <!-- Summary cards -->
      <v-row>
        <v-col v-for="card in cards" :key="card.title" cols="12" sm="6" md="3">
          <MetricCard
            :title="card.title"
            :value="card.value"
            :icon="card.icon"
            :color="card.color"
            :delta="card.delta"
            :delta-label="deltaLabel"
          />
        </v-col>
      </v-row>

      <!-- Revenue + Visitors charts -->
      <v-row class="mt-2">
        <v-col cols="12" md="6">
          <v-card class="pa-4" rounded="lg" elevation="2">
            <div class="text-subtitle-1 font-weight-medium mb-2">Monthly Revenue</div>
            <RevenueBarChart :months="months" :selected-index="selectedIndex" />
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-4" rounded="lg" elevation="2">
            <div class="text-subtitle-1 font-weight-medium mb-2">Visitors Over Time</div>
            <VisitorsLineChart :months="months" :selected-index="selectedIndex" />
          </v-card>
        </v-col>
      </v-row>

      <!-- Conversion area chart -->
      <v-row class="mt-2">
        <v-col cols="12">
          <v-card class="pa-4" rounded="lg" elevation="2">
            <div class="text-subtitle-1 font-weight-medium mb-2">Conversion Rate</div>
            <ConversionAreaChart :months="months" :selected-index="selectedIndex" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
