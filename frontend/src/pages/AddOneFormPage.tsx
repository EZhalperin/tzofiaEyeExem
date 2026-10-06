import { fetchUrl } from "../helper/fetchUrl";
import { useNavigate } from "react-router-dom";
const AddOneFormPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
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
              "POST",
              null,
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
        <input
          type="text"
          placeholder="displayName:"
          name="displayName"
          required
        ></input>
        <input
          type="text"
          placeholder="description:"
          name="description"
          required
        ></input>
        <p>priority</p>
        <select name="priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <p>arena</p>
        <select name="arena">
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
        </select>
        <p>status</p>
        <select name="status">
          <option value="Active">Active</option>
          <option value="Handled">Handled</option>
        </select>
        <p></p>
        <input type="text" placeholder="longitude:" name="lon" required></input>
        <input type="text" placeholder="latitude:" name="lat" required></input>
        <p>all params reqired</p>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default AddOneFormPage;
