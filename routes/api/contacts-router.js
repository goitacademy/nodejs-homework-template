import express from "express";

import { ctrlWrapper } from "../../decorators/index.js";

import {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateFavorite,
} from "../../controllers/contacts-controllers/index.js";

import {
  isValidId,
  isEmptyBody,
  authenticate,
} from "../../middlewars/index.js";

const router = express.Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", isValidId, ctrlWrapper(getById));

router.post("/", isEmptyBody, ctrlWrapper(add));

router.put("/:contactId", isValidId, isEmptyBody, ctrlWrapper(updateById));

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  ctrlWrapper(updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(deleteById));

export default router;
