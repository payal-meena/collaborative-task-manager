import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registration successful");
      navigate("/login");
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
        Register
      </h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border p-2 sm:p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 sm:p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 sm:p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
      />

      <button
        className="bg-blue-900 hover:bg-blue-800 text-white p-2 sm:p-3 w-full rounded transition"
      >
        Register
      </button>
    </form>
  </div>
);

}

export default Register;
