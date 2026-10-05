import { useEffect } from "react";
import AlertsMap from "../AlertsMap";
import { useNavigate } from "react-router-dom";
import { useAlertsStore } from "../store/useAlertsStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { alerts, fetchAlerts } = useAlertsStore();
  useEffect(() => {
    fetchAlerts();
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
