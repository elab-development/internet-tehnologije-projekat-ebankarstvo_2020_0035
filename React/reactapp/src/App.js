import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavigationMenu from "./NavigationMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transfer from "./Transfer";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import AdminPage from "./AdminPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/adminPage" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
