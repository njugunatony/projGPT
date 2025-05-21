import { useEffect, useState } from "react";
import { employeeService } from "../services/employeeService";
import { Employee } from "../models/Employee";

export function useEmployees(tenantId: string) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    employeeService.list(tenantId)
      .then(setEmployees)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [tenantId]);

  return { employees, loading, error };
}