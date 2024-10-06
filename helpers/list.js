export const sales = [
  { date: "2024-08-31", amount: 450 },
  { date: "2024-09-01", amount: 134 },
  { date: "2024-09-02", amount: 401 },
  { date: "2024-09-03", amount: 0 },
  { date: "2024-09-04", amount: 410 },
  { date: "2024-09-05", amount: 0 },
  { date: "2024-09-06", amount: 314 },
];

export const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));
