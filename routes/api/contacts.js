import express from "express";
import ctrl from "../../controllers/index.js";
import mdlwr from "../../middlewares/index.js";
import models from "../../models/index.js";

const { contacts } = ctrl;
const { getAll, add, getById, updateById, removeById, updateStatus } = contacts;

const { validation, ctrlWrapper } = mdlwr;

const { contactModel } = models;
const { joiSchema, statusJoiSchema } = contactModel;

const router = express.Router();

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", ctrlWrapper(getById));

router.post("/", validation(joiSchema), ctrlWrapper(add));

router.delete("/:contactId", ctrlWrapper(removeById));

router.put("/:contactId", validation(joiSchema), ctrlWrapper(updateById));

router.patch(
  "/:contactId/favorite",
  validation(statusJoiSchema),
  ctrlWrapper(updateStatus)
);

export default router;
