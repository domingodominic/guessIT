import express from "express";
import { PORT, mongoDBURL } from "./configs.js";
import fastfoodoute from "../backend/routes/fastfoodRoute.js";
import leaderBoard from "../backend/routes/leaderboardRoute.js";

import mongoose from "mongoose";
import cors from "cors";

const app = express();
const uri =
  "mongodb+srv://dominicpunladomingo120:root123@guessgame.up8e3xe.mongodb.net/?retryWrites=true&w=majority";

const corsOptions = {
  origin: ["http://localhost:3000", "https://glamourease.vercel.app/"],
  methods: "PUT, POST, DELETE, GET",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

app.use(express.json());
app.get("/", (req, res) => {
  res.json("worked");
});
app.use("/fastfood", fastfoodoute);
app.use("/leaderboard", leaderBoard);

mongoose
  .connect(uri)
  .then(() => {
    console.log("App connected");
    app.listen(PORT, () => {
      console.log(`Server is currently listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
