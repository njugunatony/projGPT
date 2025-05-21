# Step 1: HR Platform – Employee Domain Model & Relationships

## 1.1. **Employee Master Data Model**

| Field                | Type           | Description                        | Example                          |
|----------------------|----------------|------------------------------------|----------------------------------|
| id                   | string (UUID)  | Unique employee ID                 | "EMP-12345"                      |
| tenantId             | string         | Company/tenant reference           | "company-kenya"                  |
| firstName            | string         | First name                         | "Jane"                           |
| lastName             | string         | Last name                          | "Doe"                            |
| fullName             | string         | Full name (computed)               | "Jane Doe"                       |
| photoUrl             | string         | Profile photo                      | "https://..."                    |
| gender               | string/enum    | Gender                             | "Female"                         |
| dob                  | date           | Date of birth                      | "1990-03-15"                     |
| nationalities        | [string]       | List of nationalities              | ["Kenya", "UK"]                  |
| maritalStatus        | string/enum    | Marital status                     | "Single"                         |
| contactEmail         | string         | Personal email                     | "jane.doe@email.com"             |
| phone                | string         | Main phone                         | "+254722000000"                  |
| address              | object         | Address fields                     | { country, city, ... }           |
| employment           | object         | Details below                      | see below                        |
| documents            | [object]       | Uploaded docs (see table below)    |                                  |
| customFields         | object         | For extensibility                  | { bloodType: "A+" }              |
| createdAt            | timestamp      | Record created                     |                                  |
| updatedAt            | timestamp      | Last updated                       |                                  |

---

### **Employment Details (Embedded Object)**

| Field          | Type         | Description                       |
|----------------|--------------|-----------------------------------|
| employeeNumber | string       | Internal employee number          |
| type           | enum         | "permanent", "contract", etc.     |
| departmentId   | string       | FK: Department                    |
| positionId     | string       | FK: Position/JobRole              |
| reportsTo      | string       | Manager’s employeeId              |
| locationId     | string       | FK: Office/Location               |
| dateHired      | date         | Date joined                       |
| dateEnd        | date/null    | End date (if contract)            |
| status         | enum         | "active", "inactive", etc.        |
| workPermit     | object       | Visa/work permit info (if needed) |
| salary         | object       | Current salary record             |

---

### **Document Management (Array of Objects)**

| Field            | Type           | Description                  |
|------------------|----------------|------------------------------|
| type             | enum           | "contract", "NDA", etc.      |
| fileUrl          | string         | Link to file                 |
| issuedAt         | date           | When issued                  |
| expiresAt        | date           | Expiry date                  |
| status           | enum           | "valid", "expired", etc.     |
| uploadedBy       | string         | UserId of uploader           |

---

## 1.2. **Related Entities**

### a) **Department**
- id, tenantId, name, description, parentDepartmentId

### b) **Position/JobRole**
- id, tenantId, title, description, grade, departmentId

### c) **Office/Location**
- id, tenantId, name, address, timezone

### d) **Company/Tenant**
- id, name, registrationNumber, country, currency, industry, etc.

---

## 1.3. **Relationships**

- **Each employee** belongs to one company/tenant.
- **Each employee** is assigned to one department, one position, and one location.
- **Each employee** may report to another employee (manager).
- **Each department/position/location** is scoped to a tenant.
- **All fields** must be extensible for future needs (custom fields).

---

## 1.4. **Access Roles (RBAC)**

| Role       | Example Permissions                                   |
|------------|------------------------------------------------------|
| Superadmin | Manage all tenants/companies, all employee data      |
| HR admin   | Manage employee/org data for their tenant            |
| Manager    | View/edit team data, approve requests                |
| Employee   | View/edit own data, upload docs, request leave, etc. |

---

## 1.5. **Compliance/Internationalization Considerations**

- Support for multiple nationalities, addresses, and legal IDs per employee
- Support for country-specific fields (e.g., US SSN, Kenya NSSF, India PAN)
- Date, number, and address formats must be locale-aware
- Privacy: Only authorized roles see sensitive fields (salary, IDs, etc.)

---

## **Next Step:**

- Review and adjust this model to your business needs.
- Once finalized, proceed to Step 2: Multi-tenant Data Architecture & Schema Implementation.