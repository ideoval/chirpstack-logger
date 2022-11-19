import { useEffect, useState } from "react";
import {
  getDevices,
  getRecords,
  getSensors,
  recordsChannel,
  unsubscribe,
} from "../js/queries";
import Map from "./Map";
import Plot from "./Plot";

const DeviceList = () => {
  const [nodes, setNodes] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [nodeSensors, setNodeSensors] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [error, setError] = useState({ devices: null, sensors: null });
  const [newRecord, setNewRecord] = useState();
  const [device, setDevice] = useState();

  const handleDevice = (e) => {
    const { id } = e.target;
    setDevice(nodes.find((node) => node.id === parseInt(id)));
    setNodeSensors(
      sensors.filter((sensor) => sensor.device_id === parseInt(id))
    );
  };

  useEffect(() => {
    getDevices().then(({ data, err }) => {
      setNodes(data || []);
      setError((e) => ({ ...e, devices: err }));
    });
    getSensors().then(({ data, err }) => {
      setSensors(data || []);
      setError((e) => ({ ...e, sensors: err }));
    });

    const recordsSubscription = recordsChannel(setNewRecord);
    return () => {
      unsubscribe(recordsSubscription);
    };
  }, []);

  useEffect(() => {
    if (nodeSensors.length > 0) {
      const fetchMeasurements = async () => {
        const result = [];
        for (const sensor of nodeSensors) {
          const { data: records } = await getRecords(sensor.id);
          result.push({ ...sensor, records });
        }
        return result;
      };

      fetchMeasurements().then((res) => setMeasurements(res));
    }
  }, [nodeSensors]);

  useEffect(() => {
    if (newRecord) {
      const index = measurements.findIndex(
        (m) => m.id === newRecord.new.sensor_id
      );
      console.log("sensor_id:", newRecord.new.sensor_id, "index", index);
      if (index >= 0) {
        setMeasurements((s) => {
          const temp = [...s];
          temp[index].records.push(newRecord.new);
          return temp;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRecord]);

  return (
    <>
      <ul>
        {nodes.map((node) => (
          <li key={node.id} id={node.id} onClick={handleDevice}>
            {node.name}
          </li>
        ))}
        {error && <p className="has-text-danger"></p>}
      </ul>
      <h1 className="title has-text-centered">{device?.name}</h1>
      {error.devices && (
        <p className="has-text-danger">{error.devices.message}</p>
      )}
      {error.sensors && (
        <p className="has-text-danger">{error.sensors.message}</p>
      )}
      {/* <Map nodes={nodes} sensors={sensors}/> */}
      <Plot measurements={measurements} />
    </>
  );
};

export default DeviceList;
