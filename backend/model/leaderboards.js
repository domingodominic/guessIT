import mongoose from "mongoose";

const leaderboardsSchema = mongoose.Schema(
  {
    playerName: { type: String },
    score: { type: Number },
  },
  { timestamps: true }
);

export const leaderBoardModel = mongoose.model(
  "leaderboards",
  leaderboardsSchema
);
