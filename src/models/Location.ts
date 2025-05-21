export interface Location {
  id: string;
  tenantId: string;
  name: string;
  address: {
    country: string;
    city: string;
    street?: string;
    postalCode?: string;
  };
  timezone: string;
  createdAt: string;
  updatedAt: string;
}