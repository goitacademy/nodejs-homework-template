import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "succes" });
});

export { router };
