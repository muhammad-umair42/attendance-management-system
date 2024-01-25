export const generateTodayDates = () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  const currentDate = new Date();

  return { todayEnd, todayStart, currentDate };
};
