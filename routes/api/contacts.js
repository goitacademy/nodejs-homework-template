import contactsOperations from "../models/contacts.js";
import { HttpError } from "../../helpers/httpError.js";
const express = require("express");
const { validate } = require("../../middlewares/validatitionMiddleware.js");
const { schema } = require("../../middlewares/schemas/contact.js");

const router = express.Router();

router.get("/", async (_, res, __) => {
  const result = await contactsOperations.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, __) => {
  const { id } = req.params;
  const result = await contactsOperations.getContactById(id);

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found!`);
  }

  res.json(result);
});

router.post("/", validate(schema), async (req, res, __) => {
  const contact = await contactsOperations.addContact(req.body);
  res.status(201).json(contact);
});

router.delete("/:contactId", async (req, res, __) => {
  const { id } = req.params;

  const contact = await contactsOperations.removeContact(id);
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.status(200).json({ message: "Contact deleted" });
});

router.put("/:contactId", validate(schema), async (req, res, __) => {
  const { id } = req.params;

  const contact = await contactsOperations.updateContact(id, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.status(200).json(contact);
});

module.exports = router;
