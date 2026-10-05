import { useEffect, useState } from "react";
import AlertsMap from "../AlertsMap";
import { fetchUrl } from "../helper/fetchUrl";

const HomePage = () => {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    async function f() {
      const { data, message } = await fetchUrl("GET");
      setAlerts(data);
    }
    f();
  }, []);

  return (
    <>
      <div>HomePage</div>
      <AlertsMap alerts={alerts}></AlertsMap>
    </>
  );
};

export default HomePage;
