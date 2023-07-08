const express = require("express");
const path = require("path");

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require(path.join(__dirname, "..", "..", "models", "contacts"));

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  const message = "your contacts: ";
  res.json({ message, contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
  const contactById = await getContactById(contactId);
  const message = "your contactById: ";
  res.json({ message, contactById });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body; // Извлекаем данные из тела запроса
  // console.log(req.body)
  const newContact = await addContact({ name, email, phone }); // Передаем параметр contact
  const message = "Your new contact: ";
  res.json({ message, newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
  const removedById = await removeContact(contactId);
  const message = "your removed contactById: ";
  res.json({ message, removedById });
});

router.put("/:contactId", async (req, res, next) => {
  // console.log(req.body, req.params)

  const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
  const { name, email, phone } = req.body; // Извлекаем данные из тела запроса

  const newContact = { name, email, phone }; // Создаем объект newContact

  const updatedContact = await updateContact(contactId, newContact); // Передаем параметры contactId и newContact

  const message = "your updated contactById: ";
  res.json({ message, updatedContact });
});

module.exports = router;
