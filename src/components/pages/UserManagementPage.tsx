import React, { useState, useEffect } from "react";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { User } from "../../models/User";

const ROLES = ["superadmin", "tenant"];

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "users"));
      setUsers(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Add or update user
  const handleSave = async (user: User) => {
    await setDoc(doc(db, "users", user.id), user);
    setUsers(prev =>
      prev.some(u => u.id === user.id)
        ? prev.map(u => (u.id === user.id ? user : u))
        : [...prev, user]
    );
  };

  // Delete user
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2>User Management</h2>
      {loading ? <p>Loading...</p> : (
        <table>
          <thead>
            <tr><th>Email</th><th>Role</th><th>Tenant</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>
                  <select value={u.role} onChange={e => handleSave({ ...u, role: e.target.value as any })}>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td>
                  <input value={u.tenantId || ""} onChange={e => handleSave({ ...u, tenantId: e.target.value })} />
                </td>
                <td>
                  <button onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagementPage;