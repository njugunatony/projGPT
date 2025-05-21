import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../../firebase";
import { Department } from "../../models/Department";

const DEFAULT_DEPARTMENT: Partial<Department> = {
  name: "",
  description: "",
};

export const DepartmentCRUDPage: React.FC<{ companyId: string }> = ({ companyId }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form, setForm] = useState<Partial<Department>>(DEFAULT_DEPARTMENT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);

  // Advanced features
  const [search, setSearch] = useState("");
  const [pageSize] = useState(10);
  const [lastDoc, setLastDoc] = useState<any | null>(null);
  const [hasMore, setHasMore] = useState(false);

  // List loading with search & pagination
  const loadDepartments = async (reset = false) => {
    setListLoading(true);
    try {
      let q = collection(db, "companies", companyId, "departments");
      let qRef: any = query(q, orderBy("name"), limit(pageSize));
      if (search) {
        qRef = query(q, where("name", ">=", search), where("name", "<=", search + "\uf8ff"), orderBy("name"), limit(pageSize));
      }
      if (!reset && lastDoc) {
        qRef = query(qRef, startAfter(lastDoc));
      }
      const snap = await getDocs(qRef);
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Department));
      if (reset) setDepartments(rows);
      else setDepartments((prev) => [...prev, ...rows]);
      setLastDoc(snap.docs[snap.docs.length - 1]);
      setHasMore(snap.size === pageSize);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    setLastDoc(null);
    loadDepartments(true);
    // eslint-disable-next-line
  }, [companyId, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
  };

  const handleEdit = (dep: Department) => {
    setForm(dep);
    setEditingId(dep.id);
    setError(null);
    setFieldErrors({});
    setSuccess(null);
  };

  const handleNew = () => {
    setForm(DEFAULT_DEPARTMENT);
    setEditingId(null);
    setError(null);
    setFieldErrors({});
    setSuccess(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this department?")) return;
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "companies", companyId, "departments", id));
      setSuccess("Department deleted.");
      setLastDoc(null);
      loadDepartments(true);
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

    // Simple validation
    const errors: { [f: string]: string } = {};
    if (!form.name || form.name.trim().length < 2) errors.name = "Name is required and must be at least 2 characters.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please fix validation errors.");
      return;
    }

    setLoading(true);
    const now = new Date().toISOString();

    try {
      if (editingId) {
        await updateDoc(doc(db, "companies", companyId, "departments", editingId), {
          ...form,
          updatedAt: now,
        });
        setSuccess("Department updated.");
      } else {
        await addDoc(collection(db, "companies", companyId, "departments"), {
          ...form,
          createdAt: now,
          updatedAt: now,
        });
        setSuccess("Department created.");
      }
      handleNew();
      setLastDoc(null);
      loadDepartments(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore) loadDepartments();
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Department Management</h2>
      {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 24, padding: 10, border: "1px solid #ccc" }}>
        <h3>{editingId ? "Edit Department" : "Add Department"}</h3>
        <div>
          <label>Name:</label>
          <input name="name" value={form.name || ""} onChange={handleChange} />
          {fieldErrors.name && <div style={{ color: "red" }}>{fieldErrors.name}</div>}
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={form.description || ""} onChange={handleChange} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading} style={{ marginRight: 8 }}>
            {editingId ? "Update" : "Add"}
          </button>
          <button type="button" onClick={handleNew} disabled={loading}>Clear</button>
        </div>
      </form>

      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Search by name"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setLastDoc(null); }}
          style={{ padding: 4, width: 200 }}
        />
      </div>

      <h3>Department List</h3>
      {listLoading && <div>Loading departments...</div>}
      <table width="100%" border={1} cellPadding={4}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan={3}>No departments found.</td>
            </tr>
          ) : (
            departments.map((dep) => (
              <tr key={dep.id}>
                <td>{dep.name}</td>
                <td>{dep.description}</td>
                <td>
                  <button onClick={() => handleEdit(dep)} disabled={loading}>Edit</button>{" "}
                  <button onClick={() => handleDelete(dep.id)} disabled={loading}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {hasMore && (
        <button onClick={handleLoadMore} disabled={listLoading} style={{ marginTop: 12 }}>
          Load More
        </button>
      )}
    </div>
  );
};