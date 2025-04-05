"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function JobCategoryChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["事務", "インバウンド", "アウトバウンド", "接客業", "店舗販売", "モバイル"],
        datasets: [
          {
            data: [12, 8, 5, 7, 6, 4],
            backgroundColor: [
              "rgba(245, 158, 11, 0.7)",
              "rgba(219, 39, 119, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(139, 92, 246, 0.7)",
              "rgba(59, 130, 246, 0.7)",
              "rgba(79, 70, 229, 0.7)",
            ],
            borderColor: [
              "rgba(245, 158, 11, 1)",
              "rgba(219, 39, 119, 1)",
              "rgba(16, 185, 129, 1)",
              "rgba(139, 92, 246, 1)",
              "rgba(59, 130, 246, 1)",
              "rgba(79, 70, 229, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}

