import express from "express";
import multer from "multer";
import logger from "morgan";
import cors from "cors";
import { nanoid } from "nanoid";
import api from "./routes/api/index.js";
import setJWTStrategy from "./config/config-passport.js";
import path from "path";
import { uploadMiddleware } from "./middlewares/upload.js";
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setJWTStrategy();
app.use("/api", api);
app.post(
  "/upload",
  uploadMiddleware.single("picture"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "File isn't a photo" });
    }
    res.json(req.file);
  }
);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
