import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if(!formData.email || !formData.password) {
      alert("All fields are required");
    }
  const res = await api.post("/auth/login", formData);
  localStorage.setItem("token", res.data.token);
  navigate("/dashboard");
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 border rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-lg sm:text-xl font-bold text-center">
        Login
      </h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 sm:p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-900"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 sm:p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-900"
      />

      <button
        type="submit"
        className="bg-green-900 hover:bg-green-800 text-white p-2 sm:p-3 w-full rounded transition"
      >
        Login
      </button>
    </form>
  </div>
);

}

export default Login;
