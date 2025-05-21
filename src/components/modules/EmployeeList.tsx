import React from "react";
import { useEmployees } from "../../hooks/useEmployees";

const EmployeeList: React.FC<{ tenantId: string }> = ({ tenantId }) => {
  const { employees, loading, error } = useEmployees(tenantId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th><th>Email</th><th>Department</th><th>Position</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.fullName}</td>
            <td>{emp.contactEmail}</td>
            <td>{emp.employment.departmentId}</td>
            <td>{emp.employment.positionId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default EmployeeList;