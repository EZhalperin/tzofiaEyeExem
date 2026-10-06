import { fetchUrl } from "../helper/fetchUrl";
import { useNavigate } from "react-router-dom";

const DeleteOneFormPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const id = formData.get("id");
          async function f() {
            const { error, message } = await fetchUrl(
              "/api/alerts",
              "DELETE",
              id,
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
        <p>Enter ID:</p>
        <input type="number" name="id" required></input>
        <button type="submit">delete</button>
      </form>
    </>
  );
};

export default DeleteOneFormPage;
