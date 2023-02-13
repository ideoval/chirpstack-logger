import { useEffect, useState } from "react";
import {
  getDevices,
  getRecords,
  recordsChannel,
  unsubscribe,
} from "../js/queries";
import Nav from "./Nav";
// import Map from "./Map";
import Plot from "./Plot";

const DeviceList = () => {
  const [nodes, setNodes] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [error, setError] = useState({ devices: null, sensors: null });
  const [newRecord, setNewRecord] = useState();
  const [device, setDevice] = useState();

  const handleDevice = (e) => {
    const id = e.target.value;
    setDevice(nodes.find((node) => node.id === parseInt(id)));
  };

  useEffect(() => {
    getDevices().then(({ data, err }) => {
      setNodes(data || []);
      setError((e) => ({ ...e, devices: err }));
    });

    const recordsSubscription = recordsChannel(setNewRecord);
    return () => {
      unsubscribe(recordsSubscription);
    };
  }, []);

  useEffect(() => {
    if (device) {
      getRecords(device.id).then(({ data }) => {
        setMeasurements(data.reverse());
      });
    }
  }, [device]);

  useEffect(() => {
    if (newRecord && device) {
      if (newRecord.new.device_id === device.id) {
        setMeasurements((s) => [...s, newRecord.new]);
        console.log(newRecord);
        console.log(measurements[measurements.length - 2]);
        console.log(measurements[measurements.length - 1]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRecord]);

  return (
    <>
      <Nav deviceList={nodes} handler={handleDevice} device={device} />

      {error && <p className="has-text-danger"></p>}
      {error.devices && (
        <p className="has-text-danger">{error.devices.message}</p>
      )}
      {error.sensors && (
        <p className="has-text-danger">{error.sensors.message}</p>
      )}
      {/* <Map nodes={nodes} sensors={sensors} /> */}
      {measurements.length > 0 && <Plot measurements={measurements} />}
    </>
  );
};

export default DeviceList;
