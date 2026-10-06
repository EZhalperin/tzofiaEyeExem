import { fetchUrl } from "../helper/fetchUrl";
import { useNavigate } from "react-router-dom";
const UpdateOneFormPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const id = formData.get("id");
          const displayName = formData.get("displayName");
          const description = formData.get("description");
          const priority = formData.get("priority");
          const arena = formData.get("arena");
          const status = formData.get("status");
          const lon = formData.get("lon");
          const lat = formData.get("lat");

          async function f() {
            const { error, message } = await fetchUrl(
              "/api/alerts",
              "PUT",
              id,
              {
                displayName,
                description,
                priority,
                arena,
                status,
                lon,
                lat,
              },
            );
            if (error) {
              alert(error);
            } else {
              alert(message);
            }
            navigate("/Home");
          }
          f();
        }}
      >
        <input type="number" name="id" placeholder="Enter ID:" required></input>
        <p>ID is reqired!</p>
        <input
          type="text"
          placeholder="displayName:"
          name="displayName"
        ></input>
        <input
          type="text"
          placeholder="description:"
          name="description"
        ></input>
        <p>priority</p>
        <select name="priority">
          <option value=""></option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <p>arena</p>
        <select name="arena">
          <option value=""></option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
        </select>
        <p>status</p>
        <select name="status">
          <option value=""></option>
          <option value="Active">Active</option>
          <option value="Handled">Handled</option>
        </select>
        <p></p>
        <input type="text" placeholder="longitude:" name="lon"></input>
        <input type="text" placeholder="latitude:" name="lat"></input>
        <p>The parameters are optional</p>
        <button type="submit">update</button>
      </form>
    </>
  );
};

export default UpdateOneFormPage;
