import { DateTime } from 'luxon';

export const generateTodayDates = () => {
  let currentDate = DateTime.local().toJSDate();
  const todayStart = new Date(currentDate);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(currentDate);
  todayEnd.setHours(23, 59, 59, 999);
  //for months
  currentDate = new Date();
  const monthStart = new Date(currentDate);
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const nextMonthStart = new Date(currentDate);
  nextMonthStart.setMonth(currentDate.getMonth() + 1, 1);
  nextMonthStart.setHours(0, 0, 0, 0);

  const monthEnd = new Date(nextMonthStart);
  monthEnd.setDate(monthEnd.getDate() - 1);
  monthEnd.setHours(23, 59, 59, 999);

  return { todayEnd, todayStart, currentDate, monthEnd, monthStart };
};

export const generateFormatedDate = date => {
  const formatedDate = DateTime.fromJSDate(date).toFormat('dd-MM-yyyy');
  const formatedTime = DateTime.fromJSDate(date).toFormat('hh:mm a');
  const monthName = DateTime.fromJSDate(date).toFormat('LLLL');
  const year = DateTime.fromJSDate(date).toFormat('yyyy');

  return { formatedDate, formatedTime, monthName, year };
};
