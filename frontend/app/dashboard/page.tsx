'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts'
import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface ChartData {
  name: string;
  value: number;
}

interface ApiResponse {
  labels: string[];
  data: number[];
}

interface CandlestickData {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function Dashboard() {
  const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([])
  const [lineChartData, setLineChartData] = useState<ChartData[]>([])
  const [barChartData, setBarChartData] = useState<ChartData[]>([])
  const [pieChartData, setPieChartData] = useState<ChartData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candlestick, lineChart, barChart, pieChart] = await Promise.all([
          axios.get<{ data: CandlestickData[] }>('http://localhost:8000/api/candlestick-data/'),
          axios.get<ApiResponse>('http://localhost:8000/api/line-chart-data/'),
          axios.get<ApiResponse>('http://localhost:8000/api/bar-chart-data/'),
          axios.get<ApiResponse>('http://localhost:8000/api/pie-chart-data/'),
        ])

        setCandlestickData(candlestick.data.data)
        setLineChartData(lineChart.data.labels.map((label, index) => ({ name: label, value: lineChart.data.data[index] })))
        setBarChartData(barChart.data.labels.map((label, index) => ({ name: label, value: barChart.data.data[index] })))
        setPieChartData(pieChart.data.labels.map((label, index) => ({ name: label, value: pieChart.data.data[index] })))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const candlestickOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }

  const candlestickSeries = [{
    data: candlestickData.map(item => ({
      x: new Date(item.x).getTime(),
      y: [item.open, item.high, item.low, item.close]
    }))
  }]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-[350px]">
          <h2 className="text-xl font-semibold mb-4">Candlestick Chart</h2>
          <ApexChart
            options={candlestickOptions}
            series={candlestickSeries}
            type="candlestick"
            height={300}
          />
        </div>
        <div className="h-[300px]">
          <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[300px]">
          <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[300px]">
          <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}