import { Router } from "express";
import {
  create,
  get,
  getById,
  remove,
  update,
  updateStatusContact,
} from "../controller/index.js";

const router = Router();

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", create);

router.delete("/:contactId", remove);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatusContact);

export default router;
