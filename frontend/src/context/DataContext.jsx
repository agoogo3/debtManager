import api from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [con_passwordError, setCon_passwordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debts, setDebts] = useState([]);
  const [debtors, setDebtors] = useState([]);
  const [errMessage, setErrMessage] = useState({ message: "", show: false });
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

  const refreshToken = async (refresh) => {
    try {
      const response = await api.post("token/refresh/", {
        refresh: refresh,
      });
      // console.log("Refresh" + refresh);

      const updatedToken = {
        access: response.data.access,
        refresh: auth.refresh,
      };
      localStorage.setItem("auth", JSON.stringify(updatedToken));
      setUser(jwtDecode(response.data.access));
      setAuth(updatedToken);
      console.log("updated");
    } catch (error) {
      logout();
    }
  };

  // Refreshing token
  useEffect(() => {
    if (auth) {
      let now = Date.now() / 1000;
      let expiredTime = jwtDecode(auth?.access).exp;
      let refreshIn = expiredTime - now;
      let updateIn = (refreshIn - 5) * 1000;

      const interval = setInterval(() => {
        refreshToken(auth.refresh);
      }, updateIn);

      return () => clearInterval(interval);
    }
  }, [auth]);

  const logout = () => {
    setUser(null);
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");
  };

  // Handling Login
  const handleLogin = async (e) => {
    setIsLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    if (form.username.value == "" || form.password.value == "") {
      setErrMessage({ message: "Fields can not be empty", show: true });
    } else {
      try {
        const response = await api.post("token/", formData);
        // console.log(jwtDecode(response.data.access));
        localStorage.setItem("auth", JSON.stringify(response.data));
        setAuth(response.data);
        setUser(jwtDecode(response.data.access));
        navigate("/dashboard");
      } catch (error) {
        setErrMessage({ message: "Incorrect Password/Username", show: true });
      }
    }
    setIsLoading(false);
  };

  // Handle Create Account
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    const form = e.target;
    const password = form.password.value;
    const con_password = form.con_password.value;
    const name = form.name.value;
    const email = form.email.value;
    const username = form.username.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9._-]{3,16}$/;

    const isPasswordValid = passwordRegex.test(password);
    const isUsernameValid = usernameRegex.test(username);
    const isConfirmPasswordValid = password === con_password;

    setPasswordError(!isPasswordValid);
    setUsernameError(!isUsernameValid);
    setCon_passwordError(!isConfirmPasswordValid);

    if (isPasswordValid && isConfirmPasswordValid) {
      setIsLoading(true);
      const request = {
        first_name: name,
        last_name: "",
        username: username,
        email: email,
        password: password,
      };
      try {
        const response = await api.post("register/", request);
        console.log(response.data);
        setErrMessage({ message: "", show: true });
        form.reset();
        form.classList.remove("was-validated");
      } catch (error) {
        setErrMessage({
          message: error.response.data.username,
          show: true,
        });
      }

      setIsLoading(false);
    }
  };

  // Handle Add debtor
  const handleAddDebtor = async (e) => {
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const phone_regex = /^[0-9]+$/;
    const name_regex = /^[A-Za-z\s]+$/;
    const test_name = name_regex.test(name);
    const test_phone = phone_regex.test(phone);
    if (name == "" || !test_name || !test_phone || phone.length < 10) {
      setErrMessage({ message: "Invalid Credentials", show: true });
      return;
    }
    try {
      const data = {
        fullname: name,
        phone: phone,
      };
      const response = await api.post("add_debtor/", data, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      });
      setDebtors([response.data.message, ...debtors]);
      console.log(response.data.message);
      setErrMessage({ message: "", show: true });
      form.classList.remove("was-validated");
      form.reset();
    } catch (err) {
      console.log(err.response.data);
      setErrMessage({ message: err.response.data.message, show: true });
    }
  };

  // Handle Add debt
  const handleAddDebt = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (
      form.debtor.value == "" ||
      form.amount.value == "" ||
      form.desc.value == ""
    ) {
      setErrMessage({ message: "Fields can not be empty", show: true });
    } else {
      setIsLoading(true);
      try {
        const data = {
          debtor: form.debtor.value,
          amount: form.amount.value,
          desc: form.desc.value,
        };
        const response = await api.post("add_debt/", data, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        });
        setDebts([...debts, response.data.message]);
        const idd = response.data.message.debtor;
        const updatedDebtor = debtors.map((debtor) => {
          if (debtor.id == idd) {
            return {...debtor, debts:[...debtor.debts,response.data.message]}
          }else{
            return debtor
          }
        });
        setDebtors(updatedDebtor)

        setErrMessage({ message: "", show: true });
        form.classList.remove("was-validated");
        form.reset();
      } catch (e) {
        setErrMessage({ message: e.response.data.message[0], show: true });
      }
    }
    setIsLoading(false);
  };

  // Fetch Debts
  useEffect(() => {
    const fetchDebt = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const response = await api.get("/fetch_debts", {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        });
        setDebts(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchDebt();
  }, [user]);

  // fetch Debtors
  useEffect(() => {
    const fetchDebt = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const response = await api.get("/fetch_debtors", {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        });
        setDebtors(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchDebt();
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        user,
        handleLogin,
        handleCreateAccount,
        handleAddDebtor,
        handleAddDebt,
        passwordError,
        con_passwordError,
        usernameError,
        isLoading,
        errMessage,
        setErrMessage,
        debts,
        debtors,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
