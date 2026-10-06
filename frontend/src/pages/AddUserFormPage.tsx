import { fetchUrl } from "../helper/fetchUrl";
import { useNavigate } from "react-router-dom";
const AddUserFormPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const userName = formData.get("userName");
          const password = formData.get("password");
          const email = formData.get("email");
          const assignedArena = formData.get("assignedArena");
          const role = formData.get("role");
          async function f() {
            const { error, message } = await fetchUrl(
              "/api/auth/register",
              "POST",
              null,
              {
                userName,
                password,
                email,
                assignedArena,
                role,
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
          placeholder="userName:"
          name="userName"
          required
        ></input>
        <input
          type="password"
          placeholder="password:"
          name="password"
          required
        ></input>
        <input type="email" placeholder="email:" name="email" required></input>
        <p>role</p>
        <select name="role">
          <option value="admin">admin</option>
          <option value="general_user">general_user </option>
          <option value="arena_user">arena_user </option>
        </select>
        <p>arena</p>
        <select name="assignedArena">
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="All">All</option>
        </select>
        <p></p>
        <p>all params reqired</p>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default AddUserFormPage;
