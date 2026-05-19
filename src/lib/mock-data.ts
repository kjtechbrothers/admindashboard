export const getDashboardData = (tenantId: string) => {
  const data: Record<string, any> = {
    alpha: {
      stats: { orders: "1,250", revenue: "$45,200", users: "890", delivery: "95%" },
      chart: [
        { name: "Mon", value: 400 }, { name: "Tue", value: 300 }, { name: "Wed", value: 500 },
        { name: "Thu", value: 280 }, { name: "Fri", value: 590 }, { name: "Sat", value: 320 },
      ],
    },
    smart: {
      stats: { orders: "4,300", revenue: "€120,500", users: "2,100", delivery: "98%" },
      chart: [
        { name: "Mon", value: 700 }, { name: "Tue", value: 850 }, { name: "Wed", value: 900 },
        { name: "Thu", value: 1200 }, { name: "Fri", value: 1100 }, { name: "Sat", value: 1300 },
      ],
    },
    city: {
      stats: { orders: "850", revenue: "£12,000", users: "450", delivery: "92%" },
      chart: [
        { name: "Mon", value: 100 }, { name: "Tue", value: 150 }, { name: "Wed", value: 200 },
        { name: "Thu", value: 180 }, { name: "Fri", value: 250 }, { name: "Sat", value: 210 },
      ],
    },
  };
  return data[tenantId] || data.alpha;
};

export const MOCK_EMPLOYEES = [
  { id: "1", tenantId: "alpha", name: "Alice Johnson", role: "Manager", status: "Active", email: "alice@alpha.com" },
  { id: "2", tenantId: "smart", name: "Bob Smith", role: "Developer", status: "Active", email: "bob@smart.com" },
  { id: "3", tenantId: "city", name: "Charlie Brown", role: "Designer", status: "Active", email: "charlie@city.com" },
  { id: "4", tenantId: "alpha", name: "Dana White", role: "HR", status: "Active", email: "dana@alpha.com" },
];