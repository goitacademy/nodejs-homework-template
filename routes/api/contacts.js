import express from "express";
import ctrl from "../../controllers/index.js";
import mdlwr from "../../middlewares/index.js";
import schemas from "../../schemas/index.js";

const { contacts } = ctrl;
const { getAll, add, getById, updateById, removeById } = contacts;
const { validation, ctrlWrapper } = mdlwr;
const { contactSchema } = schemas;

const validateMiddleware = validation(contactSchema);

const router = express.Router();

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", ctrlWrapper(getById));

router.post("/", validateMiddleware, ctrlWrapper(add));

router.delete("/:contactId", ctrlWrapper(removeById));

router.put("/:contactId", validateMiddleware, ctrlWrapper(updateById));

export default router;
