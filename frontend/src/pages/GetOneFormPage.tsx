import { useState } from "react";
import { fetchUrl } from "../helper/fetchUrl";
import type { Alert } from "../types/alertType";
import { useNavigate } from "react-router-dom";
const GetOneFormPage = () => {
  const navigate = useNavigate();

  const [oneAlert, setAlerts] = useState<Alert | null>(null);
  if (oneAlert)
    return (
      <>
        {oneAlert.id} - {oneAlert.displayName} - {oneAlert.description} -{" "}
        {oneAlert.priority} - {oneAlert.arena}- {oneAlert.status} -{" "}
        {oneAlert.lon} - {oneAlert.lat}
      </>
    );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const id = formData.get("id");
          async function f() {
            const { error, data, message } = await fetchUrl("GET", id);
            if (error) {
              alert(error);
              navigate("/");
            }
            console.log(message);
            setAlerts(data);
          }
          f();
        }}
      >
        <p>Enter ID:</p>
        <input type="number" name="id" required></input>
        <button type="submit">find</button>
      </form>
    </>
  );
};

export default GetOneFormPage;
