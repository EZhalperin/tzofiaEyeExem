import { useEffect, useState } from "react";
import AlertsMap from "../AlertsMap";
import { useNavigate } from "react-router-dom";
import { useAlertsStore } from "../store/useAlertsStore";
import { useUserStore } from "../store/useUserStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { userId, userRole } = useUserStore();

  const { alerts, fetchAlerts } = useAlertsStore();
  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <>
      <div>HomePage</div>
      <p>
        {userId} - {userRole}
      </p>
      <button onClick={() => navigate("/options")}>options</button>
      <AlertsMap alerts={alerts}></AlertsMap>
    </>
  );
};

export default HomePage;
