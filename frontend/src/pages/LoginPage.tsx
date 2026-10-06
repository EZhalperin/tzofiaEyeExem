import { useNavigate } from "react-router-dom";
import { fetchUrl } from "../helper/fetchUrl";
import { useUserStore } from "../store/useUserStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUserStore();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const userName = formData.get("userName");
          const password = formData.get("password");
          async function f() {
            const { error, data, message } = await fetchUrl(
              "/api/auth/login",
              "POST",
              null,
              { userName, password },
            );
            if (error) {
              alert(error);
            } else {
              console.log(message);
              console.log(`${data.id} - ${data.role}`);
              fetchUser(data.id, data.role);
              navigate("/Home");
            }
          }
          f();
        }}
      >
        <p>Enter user name:</p>
        <input type="text" name="userName" required></input>
        <p>Enter password:</p>
        <input type="password" name="password" required></input>
        <br></br>
        <button type="submit">find</button>
      </form>
    </>
  );
};

export default LoginPage;
