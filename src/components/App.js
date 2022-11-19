import { useState } from "react";
import DeviceList from "./DeviceList";
import Login from "./Login";

const App = () => {
  const [authenticated, setAuthenticated] = useState(true);
  
  return (
    <>
      {authenticated ? (
        <DeviceList />
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </>
  );
};

export default App;
