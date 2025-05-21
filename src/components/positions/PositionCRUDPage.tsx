import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../../firebase";
import { Position } from "../../models/Position";

const DEFAULT_POSITION: Partial<Position> = {
  title: "",
  description: "",
  departmentId: "",
};

export const PositionCRUDPage: React.FC<{ companyId: string }> = ({ companyId }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [form, setForm] = useState<Partial<Position>>(DEFAULT_POSITION);
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
  const loadPositions = async (reset = false) => {
    setListLoading(true);
    try {
      let q = collection(db, "companies", companyId, "positions");
      let qRef: any = query(q, orderBy("title"), limit(pageSize));
      if (search) {
        qRef = query(q, where("title", ">=", search), where("title", "<=", search + "\uf8ff"), orderBy("title"), limit(pageSize));
      }
      if (!reset && lastDoc) {
        qRef = query(qRef, startAfter(lastDoc));
      }
      const snap = await getDocs(qRef);
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Position));
      if (reset) setPositions(rows);
      else setPositions((prev) => [...prev, ...rows]);
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
    loadPositions(true);
    // eslint-disable-next-line
  }, [companyId, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
  };

  const handleEdit = (pos: Position) => {
    setForm(pos);
    setEditingId(pos.id);
    setError(null);
    setFieldErrors({});
    setSuccess(null);
  };

  const handleNew = () => {
    setForm(DEFAULT_POSITION);
    setEditingId(null);
    setError(null);
    setFieldErrors({});
    setSuccess(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this position?")) return;
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "companies", companyId, "positions", id));
      setSuccess("Position deleted.");
      setLastDoc(null);
      loadPositions(true);
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
    if (!form.title || form.title.trim().length < 2) errors.title = "Title is required and must be at least 2 characters.";
    if (!form.departmentId) errors.departmentId = "Department ID is required.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please fix validation errors.");
      return;
    }

    setLoading(true);
    const now = new Date().toISOString();

    try {
      if (editingId) {
        await updateDoc(doc(db, "companies", companyId, "positions", editingId), {
          ...form,
          updatedAt: now,
        });
        setSuccess("Position updated.");
      } else {
        await addDoc(collection(db, "companies", companyId, "positions"), {
          ...form,
          createdAt: now,
          updatedAt: now,
        });
        setSuccess("Position created.");
      }
      handleNew();
      setLastDoc(null);
      loadPositions(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore) loadPositions();
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Position Management</h2>
      {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 24, padding: 10, border: "1px solid #ccc" }}>
        <h3>{editingId ? "Edit Position" : "Add Position"}</h3>
        <div>
          <label>Title:</label>
          <input name="title" value={form.title || ""} onChange={handleChange} />
          {fieldErrors.title && <div style={{ color: "red" }}>{fieldErrors.title}</div>}
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={form.description || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Department ID:</label>
          <input name="departmentId" value={form.departmentId || ""} onChange={handleChange} />
          {fieldErrors.departmentId && <div style={{ color: "red" }}>{fieldErrors.departmentId}</div>}
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
          placeholder="Search by title"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setLastDoc(null); }}
          style={{ padding: 4, width: 200 }}
        />
      </div>

      <h3>Position List</h3>
      {listLoading && <div>Loading positions...</div>}
      <table width="100%" border={1} cellPadding={4}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Department ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.length === 0 ? (
            <tr>
              <td colSpan={4}>No positions found.</td>
            </tr>
          ) : (
            positions.map((pos) => (
              <tr key={pos.id}>
                <td>{pos.title}</td>
                <td>{pos.description}</td>
                <td>{pos.departmentId}</td>
                <td>
                  <button onClick={() => handleEdit(pos)} disabled={loading}>Edit</button>{" "}
                  <button onClick={() => handleDelete(pos.id)} disabled={loading}>Delete</button>
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