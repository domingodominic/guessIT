import express, { request, response } from "express";
import { leaderBoardModel } from "../model/leaderBoard.js";
const router = express.Router();

router.get("/getLeaderBoard", async (request, response) => {
  const { category } = request.query;

  console.log(category);
  const res = await leaderBoardModel.find({ category: category });

  response.send(res);
});
router.put("/newLeader", async (request, response) => {
  const { name, category, score } = request.body;

  try {
    const updatedLeader = await leaderBoardModel.findOneAndUpdate(
      { category: category },
      { name: name, score: score },
      { new: true }
    );

    if (!updatedLeader) {
      return response
        .status(404)
        .json({ message: "Leader not found for this category" });
    }

    return response.status(200).json(updatedLeader);
  } catch (error) {
    console.error("Error updating leader:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/leader", async (request, response) => {
  const { name, score, category } = request.body;

  try {
    const newLeader = new leaderBoardModel({
      category: category,
      name: name,
      score: score,
    });

    await newLeader.save();

    return response.status(201).json(newLeader);
  } catch (error) {
    console.error("Error creating new leader:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
