import React, { useEffect, useState } from "react";
import { getDepartments, addDepartment } from "./hrService";

const DepartmentManager = ({ orgId }) => {
  const [departments, setDepartments] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    const res = await getDepartments(orgId);
    setDepartments(res);
    setLoading(false);
  };

  useEffect(() => {
    if (orgId) {
      fetchDepartments();
    }
  }, [orgId]);

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!deptName) return;
    await addDepartment(orgId, { name: deptName, createdAt: new Date() });
    setDeptName("");
    fetchDepartments();
  };

  if (!orgId) return <div>Please select an organization first.</div>;

  return (
    <div>
      <h3>Departments</h3>
      <form onSubmit={handleAddDepartment}>
        <input
          type="text"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
          placeholder="Department Name"
        />
        <button type="submit">Add Department</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {departments.map((dept) => (
            <li key={dept.id}>{dept.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DepartmentManager;