import { sales } from "./list";

const fillDates = (salesData) => {
  const startDate = new Date("2024-08-31");
  const endDate = new Date("2024-09-06");
  let currentDate = new Date(startDate);
  const filledData = [];

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    const existingData = salesData.find((d) => d.date === dateStr);
    if (existingData) {
      filledData.push(existingData);
    } else {
      filledData.push({ date: dateStr, amount: 0 });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return filledData;
};

export const processedSales = fillDates(sales);
