const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const contactsSchema = require("../../schemas/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.send(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const findedContact = await getContactById(contactId);
  if (findedContact === undefined) {
    return next();
  }
  res.send(findedContact);
});

router.post("/", async (req, res, next) => {
  const response = contactsSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }

  const newContact = await addContact(response.value);

  res.status(201).send(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);

  console.log(deletedContact);

  if (!deletedContact) {
    return next();
  }
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;

  const response = contactsSchema.validate(body);
  if (response.error) {
    return res
      .status(400)
      .json(response.error.details.map((err) => err.message).join(", "));
  }

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const updatedContact = await updateContact(contactId, body);

    if (updatedContact && updatedContact.message === "Not found") {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
