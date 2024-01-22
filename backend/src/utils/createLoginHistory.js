import { LoginHistory } from '../models/loginHistory.model.js';
import { ApiError } from './apiError.js';

export const handleLoginHistory = async user => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
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
          date: todayStart,
        },
        {
          $push: { history: { user: user._id } },
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
