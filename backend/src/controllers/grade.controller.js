import { Attendance } from '../models/attendance.model.js';
import { Grade } from '../models/grade.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateFormatedDate } from '../utils/generateTodayDates.js';

export const getUserGrade = asyncHandler(async (req, res) => {
  const userId = req?.params?.id;
  let StructuredGrade = false;

  if (!userId) {
    throw new ApiError(401, 'Please provide user id');
  }

  const grade = await Grade.findOne({ user: userId });

  if (!grade) {
    StructuredGrade = false;
  }
  if (grade.gradeHistory.length > 0) {
    const { formatedDate, formatedTime, monthName, year } =
      generateFormatedDate(grade.gradeHistory[0].date);

    StructuredGrade = {
      grade: grade.gradeHistory[0].grade,
      date: formatedDate,
      time: formatedTime,
      presents: grade.gradeHistory[0].presents,
      leaves: grade.gradeHistory[0].leaves,
      month: monthName,
      year: year,
    };
  }

  res
    .status(200)
    .json(new ApiResponse(200, { grade: StructuredGrade }, 'success'));
});
