import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUrl } from "../helper/fetchUrl";
import type { Alert } from "../types/alertType";

const GetAllFormPage = () => {
  const navigate = useNavigate();
  const [priority, setPriority] = useState("");
  const [arena, setArena] = useState("");
  const [status, setStatus] = useState("");
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    async function f() {
      const { data, message } = await fetchUrl("GET");
      console.log(message);
      setAlerts(data);
    }
    f();
  }, []);
  const listItems = alerts.map((al: Alert) => {
    if (
      al.priority.includes(priority) &&
      al.arena.includes(arena) &&
      al.status.includes(status)
    )
      return (
        <li key={al.id}>
          {al.displayName} - {al.description} - {al.priority} - {al.arena} -{" "}
          {al.status} - {al.lon} - {al.lat}
        </li>
      );
  });
  return (
    <>
      <button onClick={() => navigate("/")}>Home</button>
      <ul>{listItems}</ul>
      <p>select by:</p>
      <p>priority</p>
      <select
        onChange={(e) => {
          e.preventDefault();
          setPriority(e.currentTarget.value);
        }}
        name="priority"
      >
        <option value=""></option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>
      <p>arena</p>
      <select
        onChange={(e) => {
          e.preventDefault();
          setArena(e.currentTarget.value);
        }}
        name="arena"
      >
        <option value=""></option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="Center">Center</option>
      </select>
      <p>status</p>
      <select
        onChange={(e) => {
          e.preventDefault();
          setStatus(e.currentTarget.value);
        }}
        name="status"
      >
        <option value=""></option>
        <option value="Active">Active</option>
        <option value="Handled">Handled</option>
      </select>
    </>
  );
};

export default GetAllFormPage;
