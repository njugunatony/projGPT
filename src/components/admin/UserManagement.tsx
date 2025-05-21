import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { User } from "../../models/User";
import { useAuth } from "../../context/AuthContext";

const SUPERADMINS = [
  "njugunatoney@gmail.com",
  "githinjitoney@gmail.com",
  "njeriwakahiu44@gmail.com",
];

const ROLES: Array<User["role"]> = [
  "superadmin",
  "hr_admin",
  "manager",
  "employee",
];

export const UserManagement: React.FC = () => {
  const { profile } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<User>>({ role: "employee" });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Only allow listed emails to access this UI
  if (!profile || !SUPERADMINS.includes(profile.email)) {
    return <div>Not authorized.</div>;
  }

  // Load all users
  useEffect(() => {
    setLoading(true);
    getDocs(collection(db, "users"))
      .then((snap) => {
        setUsers(
          snap.docs.map((d) => ({ id: d.id, ...d.data() } as User))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.role || !form.tenantId) {
      setError("Email, Role, and Tenant are required.");
      return;
    }
    // Only allow superadmin role assignment by valid superadmins
    if (
      form.role === "superadmin" &&
      !SUPERADMINS.includes(profile.email)
    ) {
      setError("Only system superadmins can assign superadmin role.");
      return;
    }
    if (
      form.role === "superadmin" &&
      !SUPERADMINS.includes(form.email)
    ) {
      setError(
        "Only the specified emails may be assigned the superadmin role."
      );
      return;
    }

    try {
      if (editingUserId) {
        // Update existing user
        await updateDoc(doc(db, "users", editingUserId), {
          ...form,
          updatedAt: new Date().toISOString(),
        });
      } else {
        // Add new user
        await addDoc(collection(db, "users"), {
          ...form,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      setForm({ role: "employee" });
      setEditingUserId(null);
      // Reload users
      const snap = await getDocs(collection(db, "users"));
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as User)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Edit user
  const handleEdit = (u: User) => {
    setForm(u);
    setEditingUserId(u.id);
  };

  // New user
  const handleNew = () => {
    setForm({ role: "employee" });
    setEditingUserId(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>User Management (Superadmin Only)</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <div>
          <label>Email:</label>
          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            type="email"
            required
            disabled={!!editingUserId}
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={form.role || ""}
            onChange={handleChange}
            required
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tenant (companyId):</label>
          <input
            name="tenantId"
            value={form.tenantId || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Display Name:</label>
          <input
            name="displayName"
            value={form.displayName || ""}
            onChange={handleChange}
          />
        </div>
        {error && (
          <div style={{ color: "red", marginTop: 8 }}>{error}</div>
        )}
        <button type="submit" style={{ marginRight: 8 }}>
          {editingUserId ? "Update User" : "Invite User"}
        </button>
        <button type="button" onClick={handleNew}>
          New User
        </button>
      </form>
      <table width="100%" border={1}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Tenant</th>
            <th>Display Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.tenantId}</td>
              <td>{u.displayName}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};