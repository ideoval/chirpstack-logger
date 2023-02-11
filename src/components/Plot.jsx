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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const labels = measurements.map((m) =>
    new Date(m.created_at).toLocaleString()
  );

  const voltages = {
    labels,
    datasets: [
      {
        label: "Voltage",
        data: measurements.map((m) => m.v),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const current = {
    labels,
    datasets: [
      {
        label: "Corriente",
        data: measurements.map((m) => m.i),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const power = {
    labels,
    datasets: [
      {
        label: "Potencia",
        data: measurements.map((m) => m.p),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const energy = {
    labels,
    datasets: [
      {
        label: "Energia",
        data: measurements.map((m) => m.e),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const rssi = {
    labels,
    datasets: [
      {
        label: "rssi",
        data: measurements.map((m) => m.rssi),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={voltages} />;
      <Line options={options} data={current} />;
      <Line options={options} data={power} />;
      <Line options={options} data={energy} />;
      <Line options={options} data={rssi} />;
    </>
  );
};

export default Plot;
