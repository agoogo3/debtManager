import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Dashboard from "./routes/Dashboard";
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import { DataProvider } from "./context/dataContext";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
