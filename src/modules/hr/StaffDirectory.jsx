import React, { useEffect, useState } from "react";
import { getStaff, addStaff } from "./hrService";

const StaffDirectory = ({ orgId, deptId }) => {
  const [staffList, setStaffList] = useState([]);
  const [staffName, setStaffName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStaff = async () => {
    setLoading(true);
    const res = await getStaff(orgId, deptId);
    setStaffList(res);
    setLoading(false);
  };

  useEffect(() => {
    if (orgId && deptId) {
      fetchStaff();
    }
  }, [orgId, deptId]);

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (!staffName || !role) return;
    await addStaff(orgId, deptId, {
      name: staffName,
      role: role,
      createdAt: new Date(),
    });
    setStaffName("");
    setRole("");
    fetchStaff();
  };

  if (!orgId || !deptId) return <div>Select organization and department first.</div>;

  return (
    <div>
      <h4>Staff Directory</h4>
      <form onSubmit={handleAddStaff}>
        <input
          type="text"
          value={staffName}
          onChange={(e) => setStaffName(e.target.value)}
          placeholder="Staff Name"
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
        />
        <button type="submit">Add Staff</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {staffList.map((staff) => (
            <li key={staff.id}>{staff.name} - {staff.role}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StaffDirectory;