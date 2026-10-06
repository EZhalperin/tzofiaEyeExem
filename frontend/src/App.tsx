import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OptionsPage from "./pages/OptionsPage";
import GetAllFormPage from "./pages/GetAllFormPage";
import GetOneFormPage from "./pages/GetOneFormPage";
import AddOneFormPage from "./pages/AddOneFormPage";
import DeleteOneFormPage from "./pages/DeleteOneFormPage";
import UpdateOneFormPage from "./pages/UpdateOneFormPage";
import LoginPage from "./pages/LoginPage";
import AddUserFormPage from "./pages/AddUserFormPage";
import DeleteUserFormPage from "./pages/DeleteUserFormPage";

const App = () => {
  return (
    <>
      <div>App</div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/options" element={<OptionsPage />} />
          <Route path="/alerts" element={<GetAllFormPage />} />
          <Route path="/alert" element={<GetOneFormPage />} />
          <Route path="/add-alert" element={<AddOneFormPage />} />
          <Route path="/delete-alert" element={<DeleteOneFormPage />} />
          <Route path="/update-alert" element={<UpdateOneFormPage />} />
          <Route path="/add-user" element={<AddUserFormPage />} />
          <Route path="/delete-user" element={<DeleteUserFormPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
