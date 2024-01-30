import mongoose from "mongoose";

const fastfoodSchema = mongoose.Schema(
  {
    imageUrl: { type: String },
    answer: { type: String },
  },
  { timestamps: true }
);

export const fastfoodModel = mongoose.model("fastfoodmodel", fastfoodSchema);
