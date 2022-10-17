const express = require("express");
const router = express.Router();
const schema = require("../../schema/schema");

const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactsOperations.getContactById(req.params.contactId);
  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    console.log(validateBody.error);
    return res
      .status(400)
      .json({ message: "Не заповнено обов'язкове поле імені" });
  }
  const newContact = await contactsOperations.addContact(req.body);
  res.json(newContact);
  next();
});

router.delete("/:contactId", async (req, res, next) => {
  const removedContact = await contactsOperations.removeContact(
    req.params.contactId
  );
  if (removedContact.length === 0) {
    return res.status(404).json({ message: "Не знайдено" });
  }
  res.json({ message: "Контакт видалено" });
  next();
});

router.put("/:contactId", async (req, res, next) => {
  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    console.log(validateBody.error);
    return res.status(400).json({ message: "Є не заповнені поля" });
  }

  const updatedContact = await contactsOperations.updateContact(
    req.params.contactId,
    req.body
  );

  if (!updatedContact) {
    return res.status(404).json({ message: "Не знайдено" });
  }
  res.json(updatedContact);
  next();
});

module.exports = router;
