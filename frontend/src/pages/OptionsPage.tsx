import { useNavigate } from "react-router-dom";

const OptionsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/alerts")}>show all</button>
      <button onClick={() => navigate("/alert")}>show one</button>
      <button onClick={() => navigate("/add-alert")}>add alert</button>
      <button onClick={() => navigate("/delete-alert")}>delete alert</button>
      <button onClick={() => navigate("/update-alert")}>update alert</button>
      <button onClick={() => navigate("/add-user")}>add user</button>
      <button onClick={() => navigate("/delete-user")}>delete user</button>
    </>
  );
};

export default OptionsPage;
