import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const BarChart = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Kg',
          data: [440, 315, 782, 612],
          backgroundColor: [
            'rgb(54, 162, 235)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <>
      <Chart type="bar" data={chartData} options={chartOptions} />
    </>
  )
}

export default BarChart;