import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { colors } from "../js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Plot = ({ measurements }) => {
  const data = [];
  const options = [];

  measurements.forEach((measurement, index) => {
    options.push({
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: measurement.unit,
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
      },
    });
    data.push({
      labels: measurement.records.map(record => new Date(record.created_at).toLocaleString('en-GB')),
      datasets: [
        {
          label: measurement.unit,
          data: measurement.records.map(record => record.value),
          borderColor: colors[index].solid,
          backgroundColor: colors[index].transparent,
          yAxisID: "y",
        },
      ],
    });
  });

  return (
    <>
      {measurements.map((measurement, index) => (
        <Line key={index} options={options[index]} data={data[index]} />
      ))}
    </>
  );
};

export default Plot;
