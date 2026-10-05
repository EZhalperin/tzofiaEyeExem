import { useEffect, useState } from "react";
import AlertsMap from "../AlertsMap";
import { fetchUrl } from "../helper/fetchUrl";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    async function f() {
      const { data, message } = await fetchUrl("GET");
      console.log(message);
      setAlerts(data);
    }
    f();
  }, []);

  return (
    <>
      <div>HomePage</div>
      <button onClick={() => navigate("/options")}>options</button>
      <AlertsMap alerts={alerts}></AlertsMap>
    </>
  );
};

export default HomePage;
