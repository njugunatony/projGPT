export interface Employment {
  employeeNumber: string;
  type: "permanent" | "contract" | "intern" | "other";
  departmentId: string;
  positionId: string;
  locationId: string;
  dateHired: string;
  status: "active" | "inactive" | "terminated" | "onLeave";
  reportsTo?: string;
  dateEnd?: string;
  workPermit?: {
    permitNumber: string;
    expiryDate: string;
  };
  salary?: {
    amount: number;
    currency: string;
    effectiveFrom: string;
  };
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  contactEmail: string;
  employment: Employment;
  // Add other fields if needed
}