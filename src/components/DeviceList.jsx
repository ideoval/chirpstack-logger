import { useEffect, useState } from "react";
import { getDevices } from "../js/queries";

const DeviceList = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getDevices();
      setResponse(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Work!</h1>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </>
  );
};

export default DeviceList;
