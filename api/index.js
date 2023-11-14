import { Router } from "express";
import {
  create,
  get,
  getById,
  remove,
  update,
  updateStatusContact,
} from "#controllers/index.js";

const router = Router();

router.get("/", get);

router.get("/:id", getById);

router.post("/", create);

router.delete("/:id", remove);

router.put("/:id", update);

router.patch("/:id/favorite", updateStatusContact);

export default router;
