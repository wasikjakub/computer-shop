import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import "../styles/Form.css";

function Form({ route, method }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access the login function from context

  const name = method === "login" ? "Zaloguj się" : "Utwórz nowe konto";
  const payload = method === "login" ? { username: email, password } : { email, password };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    try {
      if (method === "register") {
        // Register the user
        await api.post(route, payload); // Route is `/api/user/register/`
  
        // Log in the user after successful registration
        const loginRes = await api.post("/user/token/", { username: email, password });
        
        // Save tokens in localStorage
        localStorage.setItem(ACCESS_TOKEN, loginRes.data.access);
        localStorage.setItem(REFRESH_TOKEN, loginRes.data.refresh);
  
        // Update global auth state and redirect
        await login(); // Call login to update the context state
        navigate("/"); // Redirect to the homepage
      } else if (method === "login") {
        // Log in the user
        const loginRes = await api.post(route, payload); // Route is `/api/user/token/`
  
        // Save tokens in localStorage
        localStorage.setItem(ACCESS_TOKEN, loginRes.data.access);
        localStorage.setItem(REFRESH_TOKEN, loginRes.data.refresh);
  
        // Update global auth state and redirect
        await login(); // Call login to update the context state
        navigate("/"); // Redirect to the homepage
      }
    } catch (error) {
      console.log(error)
      alert("Sprawdź poprawność adresu e-mail.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        required
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button className="form-button" type="submit" disabled={loading}>
        {method === "login" ? name : "Zarejestruj się"}
      </button>
      <h2>{method === "login" ? "Nie masz konta?" : "Masz już konto?"}</h2>
      <button className="form-button" type="button" onClick={() => navigate(method === "login" ? "/register" : "/login")}>
        {method === "login" ? "Zarejestruj się" : "Zaloguj się"}
      </button>
    </form>
  );
}

export default Form;
