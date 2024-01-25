import { LoginHistory } from '../models/loginHistory.model.js';
import { ApiError } from './apiError.js';
import { generateTodayDates } from './generateTodayDates.js';

export const handleLoginHistory = async user => {
  try {
    const { todayStart, todayEnd, currentDate } = generateTodayDates();
    const todayLoginData = await LoginHistory.findOne({
      date: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    });

    if (!todayLoginData) {
      const loginHistory = await LoginHistory.create({
        date: todayStart,
        history: [
          {
            user: user._id,
            time: currentDate,
          },
        ],
      });

      if (!loginHistory) {
        throw new ApiError(500, 'Login History Creation Failed');
      }
      return true;
    } else {
      const loginHistory = await LoginHistory.findOneAndUpdate(
        {
          date: {
            $gte: todayStart,
            $lte: todayEnd,
          },
        },
        {
          $push: { history: { user: user._id, time: currentDate } },
        },
        { new: true },
      );
      if (!loginHistory) {
        throw new ApiError(500, 'Login History Creation Failed');
      }
      return true;
    }
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while handling login history\n ${error}`,
    );
    return false;
  }
};
