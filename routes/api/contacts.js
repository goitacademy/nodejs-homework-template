const express = require("express");
const { uuid } = require("uuid");

const { validationMiddleware } = require("../../middlewares/validateContacts");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactSchema,
  putContactShema,
} = require("../../validation/validationSchemas");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (!contactById) {
    res.status(404).json({ message: "Not found!" });
    return;
  }

  res.status(200).json(contactById);
});

router.post(
  "/",
  validationMiddleware(addContactSchema),
  async (req, res, next) => {
    const { name, email, phone } = req.body;
    const body = {
      id: uuid(),
      name: name,
      email: email,
      phone: phone,
    };
    await addContact(body);
    res.status(201).json(body);
  }
);

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const response = await removeContact(contactId);

  if (!response) {
    res.status(404).json({ message: "Not found!" });
  }

  res.status(200).json({ message: "Your contact sucessfully deleted!" });
});

router.put(
  "/:contactId",
  validationMiddleware(putContactShema),
  async (req, res, next) => {
    const { contactId } = req.params;
    const response = await updateContact(contactId, req.body);
    if (!response) {
      res.status(404).json({ message: "Not found!" });
      return;
    }
    res.status(200).json(res);
  }
);

module.exports = router;
