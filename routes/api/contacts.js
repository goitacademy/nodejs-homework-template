import express from "express";
import ctrl from "../../controllers/index.js";
import mdlwr from "../../middlewares/index.js";
import models from "../../models/index.js";

const { contacts } = ctrl;
const { getAll, add, getById, updateById, removeById, updateStatus } = contacts;

const { validation, ctrlWrapper, auth } = mdlwr;

const { contactModel } = models;
const { joiSchema, statusJoiSchema } = contactModel;

export const router = express.Router();

router.get("/", auth, ctrlWrapper(getAll));

router.get("/:contactId", auth, ctrlWrapper(getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(add));

router.delete("/:contactId", auth, ctrlWrapper(removeById));

router.put("/:contactId", auth, validation(joiSchema), ctrlWrapper(updateById));

router.patch(
  "/:contactId/favorite",
  auth,
  validation(statusJoiSchema),
  ctrlWrapper(updateStatus)
);
