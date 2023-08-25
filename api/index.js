import express from "express";
import {
  get,
  getById,
  add,
  update,
  updateStatus,
  remove,
} from "../controller/index.js";

const router = express.Router();

router.get("/", get);

router.get("/:id", getById);

router.post("/", add);

router.put("/:id", update);

router.patch("/:id/favorite", updateStatus);

router.delete("/:id", remove);

export default router;
