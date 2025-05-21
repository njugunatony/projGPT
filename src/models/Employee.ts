export interface Employee {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  photoUrl?: string;
  gender?: "Male" | "Female" | "Other";
  dob?: string;
  nationalities?: string[];
  maritalStatus?: string;
  contactEmail?: string;
  phone?: string;
  address?: {
    country: string;
    city: string;
    street?: string;
    postalCode?: string;
  };
  employment: {
    employeeNumber: string;
    type: "permanent" | "contract" | "intern" | "other";
    departmentId: string;
    positionId: string;
    reportsTo?: string;
    locationId: string;
    dateHired: string;
    dateEnd?: string;
    status: "active" | "inactive" | "terminated" | "onLeave";
    workPermit?: {
      permitNumber: string;
      expiry: string;
      country: string;
    };
    salary?: {
      amount: number;
      currency: string;
      effectiveFrom: string;
    };
  };
  documents?: Array<{
    type: string;
    fileUrl: string;
    issuedAt: string;
    expiresAt?: string;
    status?: "valid" | "expired";
    uploadedBy: string;
  }>;
  customFields?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}