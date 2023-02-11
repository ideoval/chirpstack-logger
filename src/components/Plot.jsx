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
  const latest = measurements[measurements.length - 1];

  const formatTime = (sample) => {
    return new Date(sample.created_at).toLocaleString();
  };
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

  const labels = measurements.map((m) => formatTime(m));

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
    <div className="columns is-centered">
      <div
        className="is-flex"
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h1 className="title has-text-centered">Ultimas lecturas</h1>
        <table>
          <tbody>
            <tr>
              <th>Voltage:</th>
              <td className="has-text-right">{latest.v}</td>
            </tr>
            <tr>
              <th>Corriente:</th>
              <td className="has-text-right">{latest.i}</td>
            </tr>
            <tr>
              <th>Potencia:</th>
              <td className="has-text-right">{latest.p}</td>
            </tr>
            <tr>
              <th>Energia:</th>
              <td className="has-text-right">{latest.e}</td>
            </tr>
            <tr>
              <th>rssi:</th>
              <td className="has-text-right">{latest.rssi}</td>
            </tr>
            <tr>
              <th>Hora:</th>
              <td className="has-text-right">{formatTime(latest)}</td>
            </tr>
          </tbody>
        </table>
        <Line options={options} data={voltages} />;
        <Line options={options} data={current} />;
        <Line options={options} data={power} />;
        <Line options={options} data={energy} />;
        <Line options={options} data={rssi} />;
      </div>
    </div>
  );
};

export default Plot;
