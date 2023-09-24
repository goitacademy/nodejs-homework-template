import express from "express";
import Joi from "joi";
import { HttpError } from "../../helpers/index.js";
import { addContact, getContactById, listContacts } from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) throw HttpError(404, "Not found");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const result = await addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: `DELETE:contactId message` });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: `PUT:contactId message` });
});

export default router;
