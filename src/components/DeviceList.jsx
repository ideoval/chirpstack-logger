import { useEffect, useState } from "react";
import { getDevices, getRecords, getSensors } from "../js/queries";
import Plot from "./Plot";

const DeviceList = () => {
  const [nodes, setNodes] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [nodeSensors, setNodeSensors] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [error, setError] = useState({ devices: null, sensors: null });

  const handleDevice = (e) => {
    const { id } = e.target;
    console.log(id)
    setNodeSensors(
      sensors.filter((sensor) => sensor.device_id === parseInt(id))
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: devices, error: devErr } = await getDevices();
      const { data: sensors, error: senErr } = await getSensors();
      setNodes(devices || []);
      setSensors(sensors || []);
      setError({ devices: devErr, sensors: senErr });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (nodeSensors.length > 0) {
      const fetchMeasurements = async () => {
        const result=[]
        for (const sensor of nodeSensors) {
          const {data: records} = await getRecords(sensor.id)
          result.push({...sensor, records})
        }
        return result
      }
     
      fetchMeasurements().then(res => setMeasurements(res))
    }
    
  }, [nodeSensors]);

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
      {error.devices && (
        <p className="has-text-danger">{error.devices.message}</p>
      )}
      {error.sensors && (
        <p className="has-text-danger">{error.sensors.message}</p>
      )}
      <Plot measurements={measurements}/>
    </>
  );
};

export default DeviceList;
