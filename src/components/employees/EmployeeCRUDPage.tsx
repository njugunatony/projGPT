import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Employee } from "../../models/Employee";
import { validateEmployee } from "../../utils/employeeValidation";

const DEFAULT_EMPLOYEE: Partial<Employee> = {
  firstName: "",
  lastName: "",
  contactEmail: "",
  employment: {
    employeeNumber: "",
    type: "permanent",
    departmentId: "",
    positionId: "",
    locationId: "",
    dateHired: "",
    status: "active",
  },
};

export const EmployeeCRUDPage: React.FC<{ companyId: string }> = ({ companyId }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Partial<Employee>>(DEFAULT_EMPLOYEE);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch employee list
  const loadEmployees = async () => {
    setListLoading(true);
    try {
      const snap = await getDocs(collection(db, "companies", companyId, "employees"));
      setEmployees(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Employee)));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
    // eslint-disable-next-line
  }, [companyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("employment.")) {
      setForm({
        ...form,
        employment: {
          ...(form.employment || {}),
          [name.replace("employment.", "")]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
    setFieldErrors({ ...fieldErrors, [name]: undefined }); // Clear field error on change
  };

  const handleEdit = (emp: Employee) => {
    setForm(emp);
    setEditingId(emp.id);
    setError(null);
    setFieldErrors({});
    setSuccess(null);
  };

  const handleNew = () => {
    setForm(DEFAULT_EMPLOYEE);
    setEditingId(null);
    setError(null);
    setFieldErrors({});
    setSuccess(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this employee?")) return;
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "companies", companyId, "employees", id));
      setSuccess("Employee deleted.");
      loadEmployees();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate
    const validation = validateEmployee(form);
    if (!validation.valid) {
      setError("Please fix validation errors.");
      setFieldErrors(validation.errors);
      return;
    }

    setLoading(true);

    // Compute full name
    const fullName = `${form.firstName} ${form.lastName}`;
    const now = new Date().toISOString();

    try {
      if (editingId) {
        await updateDoc(doc(db, "companies", companyId, "employees", editingId), {
          ...form,
          fullName,
          updatedAt: now,
        });
        setSuccess("Employee updated.");
      } else {
        await addDoc(collection(db, "companies", companyId, "employees"), {
          ...form,
          fullName,
          createdAt: now,
          updatedAt: now,
        });
        setSuccess("Employee created.");
      }
      handleNew();
      loadEmployees();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <h2>Employee Management</h2>
      {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, padding: 10, border: "1px solid #ccc" }}>
        <h3>{editingId ? "Edit Employee" : "Add Employee"}</h3>
        <div>
          <label>First Name:</label>
          <input name="firstName" value={form.firstName || ""} onChange={handleChange} />
          {fieldErrors.firstName && <div style={{ color: "red" }}>{fieldErrors.firstName}</div>}
        </div>
        <div>
          <label>Last Name:</label>
          <input name="lastName" value={form.lastName || ""} onChange={handleChange} />
          {fieldErrors.lastName && <div style={{ color: "red" }}>{fieldErrors.lastName}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input name="contactEmail" type="email" value={form.contactEmail || ""} onChange={handleChange} />
          {fieldErrors.contactEmail && <div style={{ color: "red" }}>{fieldErrors.contactEmail}</div>}
        </div>
        <div>
          <label>Employee Number:</label>
          <input name="employment.employeeNumber" value={form.employment?.employeeNumber || ""} onChange={handleChange} />
          {fieldErrors["employment.employeeNumber"] && (
            <div style={{ color: "red" }}>{fieldErrors["employment.employeeNumber"]}</div>
          )}
        </div>
        <div>
          <label>Type:</label>
          <select name="employment.type" value={form.employment?.type || "permanent"} onChange={handleChange}>
            <option value="permanent">Permanent</option>
            <option value="contract">Contract</option>
            <option value="intern">Intern</option>
            <option value="other">Other</option>
          </select>
          {fieldErrors["employment.type"] && (
            <div style={{ color: "red" }}>{fieldErrors["employment.type"]}</div>
          )}
        </div>
        <div>
          <label>Department ID:</label>
          <input name="employment.departmentId" value={form.employment?.departmentId || ""} onChange={handleChange} />
          {fieldErrors["employment.departmentId"] && (
            <div style={{ color: "red" }}>{fieldErrors["employment.departmentId"]}</div>
          )}
        </div>
        <div>
          <label>Position ID:</label>
          <input name="employment.positionId" value={form.employment?.positionId || ""} onChange={handleChange} />
          {fieldErrors["employment.positionId"] && (
            <div style={{ color: "red" }}>{fieldErrors["employment.positionId"]}</div>
          )}
        </div>
        <div>
          <label>Location ID:</label>
          <input name="employment.locationId" value={form.employment?.locationId || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Date Hired:</label>
          <input name="employment.dateHired" type="date" value={form.employment?.dateHired || ""} onChange={handleChange} />
          {fieldErrors["employment.dateHired"] && (
            <div style={{ color: "red" }}>{fieldErrors["employment.dateHired"]}</div>
          )}
        </div>
        <div>
          <label>Status:</label>
          <select name="employment.status" value={form.employment?.status || "active"} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="terminated">Terminated</option>
            <option value="onLeave">On Leave</option>
          </select>
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading} style={{ marginRight: 8 }}>
            {editingId ? "Update" : "Add"}
          </button>
          <button type="button" onClick={handleNew} disabled={loading}>
            Clear
          </button>
        </div>
      </form>
      <h3>Employee List</h3>
      {listLoading ? (
        <div>Loading employees...</div>
      ) : (
        <table width="100%" border={1} cellPadding={4}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Emp#</th>
              <th>Type</th>
              <th>Dept</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={8}>No employees found.</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.fullName}</td>
                  <td>{emp.contactEmail}</td>
                  <td>{emp.employment.employeeNumber}</td>
                  <td>{emp.employment.type}</td>
                  <td>{emp.employment.departmentId}</td>
                  <td>{emp.employment.positionId}</td>
                  <td>{emp.employment.status}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)} disabled={loading}>Edit</button>{" "}
                    <button onClick={() => handleDelete(emp.id)} disabled={loading}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};