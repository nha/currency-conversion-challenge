import React, { useMemo, FC, useEffect, useRef, useState } from 'react'
import Vizzu, { AnimTarget } from 'vizzu'
import { useTheme } from '@mui/material'
import { useFetchHistoricalTrends } from '@/hooks/data-fetching'

const HistoricalTrendsChart: FC<Props> = props => {
  const { chartRef } = useChart(props)

  return <div ref={chartRef} id='myVizzu' style={{ width: '100%', height: '40vh' }}></div>
}

const useChart = ({ currencyCodeOne, currencyCodeTwo }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const {
    palette: { background, primary }
  } = useTheme()
  const [chart, setChart] = useState<Vizzu>()

  //@ts-ignore
  const chartConfig: AnimTarget = useMemo(
    () => ({
      config: {
        channels: {
          x: { set: ['$exists', 'Record Date'] },
          y: { set: ['$exists', 'Exchange Rates'], range: { min: '95%', max: '105%' } }
        },
        geometry: 'line'
      },
      style: {
        //@ts-ignore
        backgroundColor: background.paper,
        plot: {
          yAxis: {
            color: primary.main,
            interlacing: {
              color: background.default.replace(';', '')
            }
          }
        }
      }
    }),
    [background, primary]
  )

  useEffect(() => {
    if (chart) return
    setChart(new Vizzu('myVizzu', chartConfig))
  }, [chart, chartConfig])

  const { isLoading, lastUpdatedAts, exchangeRates } = useFetchHistoricalTrends(currencyCodeOne, currencyCodeTwo)

  const data: AnimTarget['data'] = useMemo(
    () => ({
      series: [
        {
          name: 'Record Date',
          type: 'dimension',
          values: lastUpdatedAts
        },
        {
          name: 'Exchange Rates',
          type: 'measure',
          values: exchangeRates
        }
      ]
    }),
    [exchangeRates, lastUpdatedAts]
  )

  useEffect(() => {
    if (isLoading) return
    if (!chart) return
    // This throws error "Error: error: Column name already exists: Record Date"
    chart.animate({ data })
  }, [isLoading, chart, data])

  return {
    chartRef,
    isLoading
  }
}

interface Props {
  currencyCodeOne?: string
  currencyCodeTwo?: string
}

export default HistoricalTrendsChart