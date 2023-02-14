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
  const queries = [
    { id: 1, name: "recientes", table: "records", limit: 60 },
    { id: 2, name: "horarias", table: "hourly", limit: 24 },
    { id: 3, name: "diarias", table: "daily", limit: 30 },
    { id: 4, name: "mensuales", table: "monthly", limit: 12 },
  ];

  const [nodes, setNodes] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [error, setError] = useState({ devices: null, sensors: null });
  const [newRecord, setNewRecord] = useState();
  const [device, setDevice] = useState();
  const [options, setOptions] = useState();

  const handleDevice = (e) => {
    const id = e.target.value;
    setDevice(nodes.find((node) => node.id === parseInt(id)));
  };

  const handleQuery = (e) => {
    const id = e.target.value;
    setOptions({
      device: device.id,
      ...queries.find((node) => node.id === parseInt(id)),
    });
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
    if (device && options) {
      getRecords(options).then(({ data }) => {
        setMeasurements(data.reverse());
      });
    }
  }, [device, options]);

  useEffect(() => {
    if (newRecord && device && options.table === "records") {
      if (newRecord.new.device_id === device.id) {
        setMeasurements((s) => [...s, newRecord.new]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRecord]);

  return (
    <>
      <Nav
        deviceList={nodes}
        queries={queries}
        deviceHandler={handleDevice}
        queryHandler={handleQuery}
        device={device}
      />

      {error && <p className="has-text-danger"></p>}
      {error.devices && (
        <p className="has-text-danger">{error.devices.message}</p>
      )}
      {error.sensors && (
        <p className="has-text-danger">{error.sensors.message}</p>
      )}
      {/* <Map nodes={nodes} sensors={sensors} /> */}
      {measurements.length > 0 && (
        <Plot measurements={measurements} options={options} />
      )}
    </>
  );
};

export default DeviceList;
