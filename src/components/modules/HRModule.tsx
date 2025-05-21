import React, { useState, useEffect } from "react";
import { employeeService } from "../../services/employeeService";
import { useAuth } from "../core/AuthContext";
import { Employee } from "../../models/Employee";

const emptyEmployee: Omit<Employee, "id"> = {
  tenantId: "",
  name: "",
  email: "",
  position: "",
  phone: "",
};

const HRModule: React.FC = () => {
  const { profile } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Omit<Employee, "id">>(emptyEmployee);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!profile?.tenantId) return;
    employeeService.list(profile.tenantId).then(setEmployees);
    setForm(f => ({ ...f, tenantId: profile.tenantId! }));
  }, [profile?.tenantId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await employeeService.update(editingId, form);
      setEmployees(emps => emps.map(emp => emp.id === editingId ? { ...emp, ...form } : emp));
      setEditingId(null);
    } else {
      const emp = await employeeService.create(form);
      setEmployees(emps => [...emps, emp]);
    }
    setForm({ ...emptyEmployee, tenantId: profile?.tenantId || "" });
  };

  const handleEdit = (emp: Employee) => {
    setForm({ ...emp });
    setEditingId(emp.id);
  };

  const handleDelete = async (id: string) => {
    await employeeService.remove(id);
    setEmployees(emps => emps.filter(e => e.id !== id));
  };

  return (
    <section>
      <h3>Employees</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
        />
        <input
          placeholder="Position"
          value={form.position}
          onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
          required
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setForm({ ...emptyEmployee, tenantId: profile?.tenantId || "" });
            setEditingId(null);
          }}>Cancel</button>
        )}
      </form>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Position</th><th>Phone</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.phone}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default HRModule;