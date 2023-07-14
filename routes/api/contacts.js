import express from "express";
import Joi from "joi";
import {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
} from "../../models/contacts.js";
import { HttpError } from "../../helpers/HttpError.js";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
export const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await getContactById(id);
    if (!data) {
      // return res.status(404).json({ message: "Not found" });
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      throw HttpError(404, "Not found");
    }
    res.json(data);
  } catch (error) {
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  // res.json({ message: "template message" });
  // console.log(name, email, phone);
  // if (!name || !email || !phone) {
  //   res.json({ message: "missing required name field" });
  //   return;
  // }
  // const { name, email, phone } = req.body;
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const data = await addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  const id = req.params.contactId;
  try {
    const deleting = await removeContact(id);
    if (!deleting) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { name, email, phone } = req.body;
    console.log(!name && !email && !phone);
    if (!name && !email && !phone) throw HttpError(400, "missing fields");
    const newContact = await updateContact(id, req.body);
    if (!newContact) throw HttpError(404, "Not found");
    return res.status(200).json(newContact);
  } catch (error) {
    next(error);
  }
});

// module.exports = router;
