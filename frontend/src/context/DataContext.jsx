import api from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(() =>
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("auth")
      ? jwtDecode(localStorage.getItem("auth"))
      : null
  );

  const refreshToken = async(refresh)=>{
    try{
        const response = await api.post("token/refresh/",{
            refresh : refresh
        });
        // console.log("Refresh" + refresh);

        const updatedToken = {
            access:response.data.access,
            refresh : auth.refresh
        }
        localStorage.setItem("auth", JSON.stringify(updatedToken));
        setUser(jwtDecode(response.data.access))
        setAuth(updatedToken)
        console.log("updated")
    }catch(error){
        console.log(error.response)
        logout()
    }
  }

  // Refreshing token
  useEffect(() => {
    if (auth) {
      let now = Date.now() / 1000;
      let expiredTime = jwtDecode(auth?.access).exp;
      let refreshIn = expiredTime - now;
      let updateIn = (refreshIn - 5) * 1000;

      const interval = setInterval(()=>{
        refreshToken(auth.refresh)
      },updateIn)

      return(()=>clearInterval(interval))

    }
  }, [auth]);

  const logout = () => {
    setUser(null);
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");
  };

  // Handling Login
  const handleLogin = async () => {
    const req = {
      username: "",
      password: "",
    };
    try {
      const response = await api.post("token/", req);
      console.log(jwtDecode(response.data.access));
      localStorage.setItem("auth", JSON.stringify(response.data));
      setAuth(response.data);
      setUser(jwtDecode(response.data.access));
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <DataContext.Provider
      value={{
        user,
        handleLogin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
