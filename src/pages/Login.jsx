import React, { useState } from "react";
import { loginUser } from "../services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await loginUser(form);
      setMsg("Login successful!");
      // Redirect or update app state here
    } catch (err) {
      setMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" required />
        <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Login;