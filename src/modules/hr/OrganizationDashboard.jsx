import React, { useEffect, useState } from "react";
import { getOrganizations, createOrganization } from "./hrService";

const OrganizationDashboard = () => {
  const [orgs, setOrgs] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrgs = async () => {
    setLoading(true);
    const res = await getOrganizations();
    setOrgs(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const handleAddOrg = async (e) => {
    e.preventDefault();
    if (!orgName) return;
    await createOrganization({ name: orgName, createdAt: new Date() });
    setOrgName("");
    fetchOrgs();
  };

  return (
    <div>
      <h2>Organizations</h2>
      <form onSubmit={handleAddOrg}>
        <input
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Organization Name"
        />
        <button type="submit">Add Organization</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {orgs.map((org) => (
            <li key={org.id}>{org.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrganizationDashboard;