const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { contactValidator } = require("../../utils/validators/validator");

const { HttpError } = require("../../helpers/HttpError");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    console.log("GET /", contacts);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    if (!name && !email && !phone) {
      res.status(400).json({ message: "missing fields" });
    }
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      throw HttpError(404, `Contact with id=${contactId} is not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
