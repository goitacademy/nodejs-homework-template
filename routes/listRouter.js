import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(res.locals);
});

export default router;
