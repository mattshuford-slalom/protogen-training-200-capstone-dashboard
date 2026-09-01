export interface MonthMetric {
  month: string
  revenue: number
  visitors: number
  conversion: number
  orders: number
}

export interface MetricsData {
  year: number
  months: MonthMetric[]
}
