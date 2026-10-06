import { useEffect } from "react";
import AlertsMap from "../AlertsMap";
import { useNavigate } from "react-router-dom";
import { useAlertsStore } from "../store/useAlertsStore";
import { useUserStore } from "../store/useUserStore";
import { fetchUrl } from "../helper/fetchUrl";

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
      <button
        onClick={(e) => {
          e.preventDefault();
          async function f() {
            const { message } = await fetchUrl("/api/auth/logout", "POST");
            alert(message);
            navigate("/");
          }
          f();
        }}
      >
        logout
      </button>
      <p>
        {userId} - {userRole}
      </p>
      <button onClick={() => navigate("/options")}>options</button>
      <AlertsMap alerts={alerts}></AlertsMap>
    </>
  );
};

export default HomePage;
