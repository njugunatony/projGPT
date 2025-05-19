import React, { useState } from "react";
import { registerUser } from "../services/authService";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
    department: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await registerUser(form);
      setMsg("Registration successful! Please log in.");
      setForm({
        name: "",
        email: "",
        password: "",
        organization: "",
        department: "",
        role: "",
      });
    } catch (err) {
      setMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" required />
        <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" required />
        <input name="organization" value={form.organization} onChange={handleChange} placeholder="Organization" required />
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" required />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" required />
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Sign Up"}</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Signup;