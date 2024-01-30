import mongoose from "mongoose";

const leaderBoardSchema = mongoose.Schema(
  {
    name: { type: String },
    score: { type: Number },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

export const leaderBoardModel = mongoose.model(
  "leaderBoard",
  leaderBoardSchema
);
