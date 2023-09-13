const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

// CONTROLLERS

// отримання всіх контактів
router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  console.log("It is GET");
  res.status(200).json(allContacts);
});

// отримання контакту по ід
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (contact) {
    res.status(200).json(contact);
  }
  res.status(404).json({ message: "Contact not found" });
});

// додавання нового контакту
router.post("/", async (req, res, next) => {
  const contact = await addContact(req.body);
  if (contact) {
    res.status(201).json(contact);
  }
  res.status(400).json({ message: "Something going wrong" });
});

// видалення контакту по ід
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const deleteContact = await removeContact(id);
  if (deleteContact) {
    res.status(204).json({ message: "Contact deleted" });
  }
  res.status(404).json({ message: "Contact not found" });
});

// оновлення наявного контакту
router.put("/:id", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const {id} = req.params;
  const updateById = await updateContact(id, {
        name,
        email,
        phone,
  });
  if (updateById) {
    res.status(200).json(updateById);
  }
  res.status(404).json({ message: "Contact not found" });
});

module.exports = router;
