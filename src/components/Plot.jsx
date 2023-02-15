import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { colors } from "../js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Plot = ({ measurements, options }) => {
  const latest = measurements[measurements.length - 1];

  const formatTime = (sample) => {
    const date = new Date(sample.created_at).toLocaleString("sv-SE");
    if (options === undefined) return date;
    else {
      switch (options.table) {
        case "records":
          return date;
        case "hourly":
          return date.slice(0, -3);
        case "daily":
          return date.slice(0, 10);
        case "monthly":
          return date.slice(0, 7);
        default:
          break;
      }
    }
  };

  const plotOptions = {
    interaction: {
      intersect: false,
      mode: "index",
    },
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

  const barOptions = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
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
  const eDiff = measurements.map((m, i) =>
    measurements[i + 1] !== undefined ? measurements[i + 1].e - m.e : 0
  );

  const voltages = {
    labels,
    datasets: [
      {
        label: "Voltage",
        data: measurements.map((m) => m.v),
        borderColor: colors[0].solid,
        backgroundColor: colors[0].transparent,
      },
    ],
  };

  const current = {
    labels,
    datasets: [
      {
        label: "Corriente",
        data: measurements.map((m) => m.i),
        borderColor: colors[1].solid,
        backgroundColor: colors[1].transparent,
      },
    ],
  };

  const power = {
    labels,
    datasets: [
      {
        label: "Potencia",
        data: measurements.map((m) => m.p),
        borderColor: colors[2].solid,
        backgroundColor: colors[2].transparent,
      },
    ],
  };

  const energy = {
    labels,
    datasets: [
      {
        label: "Energia",
        data: measurements.map((m) => m.e),
        borderColor: colors[3].solid,
        backgroundColor: colors[3].transparent,
      },
    ],
  };

  const consumption = {
    labels,
    datasets: [
      {
        label: "Consumos",
        data: eDiff,
        borderColor: colors[1].solid,
        backgroundColor: colors[1].transparent,
      },
    ],
  };

  const rssi = {
    labels,
    datasets: [
      {
        label: "rssi",
        data: measurements.map((m) => m.rssi),
        borderColor: colors[4].solid,
        backgroundColor: colors[4].transparent,
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
          marginTop: "1rem",
        }}
      >
        <h1 className="title has-text-centered">Lecturas {options.name}</h1>
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
        <div style={{ maxWidth: "800px" }}>
          <Line options={plotOptions} data={voltages} />
          <Line options={plotOptions} data={current} />
          <Line options={plotOptions} data={power} />
          <Bar options={barOptions} data={consumption} />
          <Line options={plotOptions} data={energy} />
          <Line options={plotOptions} data={rssi} />
        </div>
      </div>
    </div>
  );
};

export default Plot;
