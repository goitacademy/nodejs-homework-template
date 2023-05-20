const express = require("express");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {nanoid} = require("nanoid");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  // Виклик функції getById для роботи з файлом contacts.json
  const contact = getById(id);
  if (contact) {
    // Якщо такий id існує, повертаємо об'єкт контакту у форматі JSON зі статусом 200
    res.json(contact);
  } else {
    // Якщо такого id не існує, повертаємо JSON з ключем "message": "Not found" і статусом 404
    res.status(404).json({ message: "Contact with this id not found" });
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  console.log(req.body)
  // Перевірка наявності обов'язкових полів у тілі запиту
  if (!body.name || !body.email || !body.phone) {
    // Якщо якісь обов'язкові поля відсутні, повертаємо JSON з ключем "message": "missing required name field" і статусом 400
    res.status(400).json({ message: "missing required name field" });
  } else {
    // Генерація унікального ідентифікатора для контакту
    const id = nanoid();
    const contact = {
      id: id,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    // Виклик функції addContact для збереження контакту в файлі contacts.json
    addContact(contact);
    // Повернення об'єкту з доданим ідентифікатором та статусом 201
    res.status(201).json(contact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  // Виклик функції removeContact для роботи з файлом contacts.json
  const contact = removeContact(id);

  if (contact) {
    // Якщо такий id існує, повертаємо JSON формату {"message": "contact deleted"} і статусом 200
    res.json({ message: "contact deleted" });
  } else {
    // Якщо такого id не існує, повертаємо JSON з ключем "message": "Not found" і статусом 404
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  // Перевірка наявності тіла запиту
  if (!body) {
    // Якщо тіло запиту відсутнє, повертаємо JSON з ключем "message": "missing fields" і статусом 400
    res.status(400).json({ message: "missing fields" });
  } else {
    // Виклик функції updateContact для оновлення контакту в файлі contacts.json
    const updatedContact = updateContact(id, body);

    if (updatedContact) {
      // Якщо контакт успішно оновлено, повертаємо оновлений об'єкт контакту та статус 200
      res.json(updatedContact);
    } else {
      // Якщо контакт не знайдено, повертаємо JSON з ключем "message": "Not found" і статусом 404
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;
