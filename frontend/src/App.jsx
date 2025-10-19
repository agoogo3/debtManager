import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Dashboard from "./routes/Dashboard";
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import { DataProvider } from "./context/dataContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Not_found from "./routes/Not_found";
import AddDebtModal from "./utils/AddDebtModal";


function App() {
  
  return (
    <>
      <DataProvider>
        <Header />
        <AddDebtModal/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Not_found />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        <Footer />
      </DataProvider>
    </>
  );
}

export default App;
