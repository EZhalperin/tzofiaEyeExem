import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUrl } from "../helper/fetchUrl";

const GetAllFormPage = () => {
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
  const listItems = alerts.map((al) => (
    <li key={al.id}>
      {al.displayName} - {al.description} - {al.priority} - {al.arena} -{" "}
      {al.status} - {al.lon} - {al.lat}
    </li>
  ));
  return (
    <>
      <button onClick={() => navigate("/")}>options</button>
      <ul>{listItems}</ul>
    </>
  );
};

export default GetAllFormPage;
