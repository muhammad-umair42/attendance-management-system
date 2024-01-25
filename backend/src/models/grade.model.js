import mongoose from 'mongoose';

const gradeModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gradeHistory: [
      {
        date: {
          type: Date,
          required: true,
          trim: true,
          default: Date.now,
        },
        grade: {
          type: String,
          required: true,
          trim: true,
          enum: ['a', 'b', 'c', 'd'],
        },
        leaves: {
          type: Number,
          required: true,
        },
        presents: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

export const Grade = mongoose.model('Grade', gradeModel);
