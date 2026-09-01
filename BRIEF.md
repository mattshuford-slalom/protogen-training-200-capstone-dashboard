## What is this? 
A single page analytics dashboard showing monthly business metrics. Think Shopify admin or a simple Google analytics view.

## Data
Generate a fake data set as a JSON file (src/data/metrics.json).
12 months of (Jan-Dec 2025), each month contaning: 
- revenue (dollar amout, trending upward with some variation)
- visitors (number, seasonal pattern - higher in summer) 
conversations (percentage, fluctuates between 2-5%) 
- orders (number, correlates loosely with visitors)

## Layout (Vuetify)
v-app-bar at the top with the dashboard title and a month pick
- the month picker should default to showing all
- when a specific month is selected all cards and charts filter to that. When all is selected show the full. 
Below the app bar: a row of four summary cards (v-card) showing the key metrics - revenue, visitors, conversions orders
- below the cards: a row of 2 charts
- left: bar chart sowhoing monthly revenue
right: line chart showing visitors over time
- below that: one full-width area chart showing conversations 
use v-container, v-row, v-col for responsive grid layout

## Interactions
- month picker in the app bar filters everything - summary cards show that month numbers, charts, highlight, or filter to that month
- when all is selected, summary cards show yearly totals/averages, and charts show all 12 months
- cards should show a small up/down arrow or color indicating change from previous months

## Style
- dark theme by default (Vuetify dark theme) 
- clean, minimal lots of white space
- charts should use a cohesive color palette - not rainbow
- mobile, responsive - cards stack on small screen screens

## Tech
- Vue 3 + TypeScript + Vuetify 3
- Chart.js via vue-chartjs for all charts
- Fake data from a local JSON file (no API calls)
Single page - no routing needed for this app

