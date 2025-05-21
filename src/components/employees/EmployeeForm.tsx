import React, { useState } from "react";
import { validateEmployee } from "../../utils/employeeValidation";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Employee } from "../../models/Employee";

const EmployeeForm: React.FC<{ companyId: string; editingEmployee?: Employee; onSuccess: () => void }> = ({
  companyId,
  editingEmployee,
  onSuccess,
}) => {
  const [form, setForm] = useState<Partial<Employee>>(editingEmployee || {});
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate
    const validation = validateEmployee(form);
    if (!validation.valid) {
      setError("Please fix validation errors.");
      setFieldErrors(validation.errors);
      return;
    }

    try {
      if (editingEmployee && editingEmployee.id) {
        await updateDoc(
          doc(db, "companies", companyId, "employees", editingEmployee.id),
          { ...form, updatedAt: new Date().toISOString() }
        );
      } else {
        await addDoc(
          collection(db, "companies", companyId, "employees"),
          { ...form, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        );
      }
      setForm({});
      setFieldErrors({});
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to save.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          name="firstName"
          value={form.firstName || ""}
          onChange={handleChange}
        />
        {fieldErrors.firstName && <div style={{ color: "red" }}>{fieldErrors.firstName}</div>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          name="lastName"
          value={form.lastName || ""}
          onChange={handleChange}
        />
        {fieldErrors.lastName && <div style={{ color: "red" }}>{fieldErrors.lastName}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input
          name="contactEmail"
          value={form.contactEmail || ""}
          onChange={handleChange}
        />
        {fieldErrors.contactEmail && <div style={{ color: "red" }}>{fieldErrors.contactEmail}</div>}
      </div>
      <div>
        <label>Employee Number:</label>
        <input
          name="employment.employeeNumber"
          value={form.employment?.employeeNumber || ""}
          onChange={handleChange}
        />
        {fieldErrors["employment.employeeNumber"] && <div style={{ color: "red" }}>{fieldErrors["employment.employeeNumber"]}</div>}
      </div>
      {/* Repeat for other fields and errors */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">{editingEmployee ? "Update" : "Create"}</button>
    </form>
  );
};

export default EmployeeForm;