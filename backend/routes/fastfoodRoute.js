import express, { response } from "express";
import { fastfoodModel } from "../model/fastfoodModel.js";
const router = express.Router();

router.post(`/uploadNew`, async (request, response) => {
  const { answers, image } = request.body;

  const newFastfoodModel = new fastfoodModel({
    imageUrl: image,
    answer: answers,
  });

  const success = await newFastfoodModel.save();

  response.json(success);
});

router.get("/getData", async (request, response) => {
  const getFastfoodData = await fastfoodModel.find({});

  response.json(getFastfoodData);
});

export default router;
