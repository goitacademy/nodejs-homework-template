import express from "express";
import {
  getContactById,
  listContacts,
  addContact,
  removeContact,
} from "../../models/contacts.js";
import { HttpError } from "../../helpers/HttpError.js";

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
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.json({ message: "missing required name field" });
    return;
  }
  const data = await addContact(req.body);
  res.json(data);
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  const id = req.params.contactId;
  const deleting = await removeContact(id);
  // console.log(deleting);
  if (!deleting) return res.status(404).json({ message: "Not found" });
  return res.json({ message: "contact deleted" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  const id = req.params.contactId;
  const { name, email, phone } = req.body;
  if (!req.body) res.status(400).json({ message: "missing fields" });
});

// module.exports = router;
