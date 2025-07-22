import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

const PieChart = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/complain');
      const complaints = await response.json();

      const groupAsOthers = ['Dead Animal', 'Streetlight', 'Roads'];

      const counts = {};

      complaints.forEach(c => {
        let category = c.category_name;

        if (groupAsOthers.includes(category)) {
          category = 'Others';
        }

        counts[category] = (counts[category] || 0) + 1;
      });

      const labels = Object.keys(counts);
      const values = Object.values(counts);

      const colorPalette = [ '#FF7043', '#66BB6A', '#FFCA28', '#AB47BC' ];
      const hoverColors = [ '#FF7043', '#66BB6A', '#FFCA28', '#AB47BC' ];

      const backgroundColor = labels.map((_, i) => colorPalette[i % colorPalette.length]);
      const hoverBackgroundColor = labels.map((_, i) => hoverColors[i % hoverColors.length]);

      setChartData({
        labels,
        datasets: [
          {
            data: values,
            backgroundColor,
            hoverBackgroundColor
          }
        ]
      });

      setChartOptions({
        plugins: {
          legend: {
            labels: {
              usePointStyle: true
            }
          }
        }
      });
    };

    fetchData();
  }, []);

  return (
    <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
  );
};

export default PieChart;
