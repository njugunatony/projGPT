// Mocked, replace with real API/DB calls

export const getProperties = async (filter = {}) => {
  // Example filter: { type, location, minPrice, maxPrice }
  // Replace this with a real DB/API query
  return [
    {
      id: "1",
      title: "Modern 2BR Apartment",
      type: "apartment",
      location: "Nairobi",
      price: 12000000,
      images: [],
      agentId: "agent1",
    },
    {
      id: "2",
      title: "Prime Commercial Plot",
      type: "land",
      location: "Mombasa Road",
      price: 7000000,
      images: [],
      agentId: "agent2",
    },
  ].filter((p) =>
    (!filter.type || p.type === filter.type) &&
    (!filter.location || p.location.includes(filter.location)) &&
    (!filter.minPrice || p.price >= filter.minPrice) &&
    (!filter.maxPrice || p.price <= filter.maxPrice)
  );
};