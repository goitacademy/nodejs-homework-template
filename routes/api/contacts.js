import express from "express";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";
import {
  add,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../../controllers/contactsController.js";

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", isEmptyBody, add);

router.delete("/:id", deleteById);

router.put("/:id", isEmptyBody, updateById);

export default router;
