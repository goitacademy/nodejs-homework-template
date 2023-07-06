// contacts.js

const express = require("express");

const router = express.Router();
const contacts = require("../../models/actions");

router.get("/", async (req, res, next) => {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;

    // Виклик функції для отримання контакту за його id
    const contact = await contacts.getContactById(contactId);

    // Перевірка наявності контакту
    if (!contact) {
        return res.status(404).json({ message: "Not found" });
    }

    // Відправка відповіді з контактом та статусом 200
    res.status(200).json(contact);
});

router.use(express.urlencoded({ extended: true }));
router.post("/", async (req, res, next) => {
    const { name, email, phone } = req.body;

    // Перевірка наявності обов'язкових полів
    if (!name || !email || !phone) {
        return res.status(400).json({ message: "missing required fields" });
    }

    // Створення нового контакту з унікальним ідентифікатором
    const newContact = {
        id: generateUniqueId(),
        name,
        email,
        phone,
    };

    // Виклик функції додавання контакту
    const addedContact = await contacts.addContact(newContact);

    // Відправка відповіді з доданим контактом та статусом 201
    res.status(201).json(addedContact);
});

router.delete("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;

    const deletedContact = await contacts.removeContact(contactId);

    // Перевірка наявності видаленого контакту
    if (!deletedContact) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "contact deleted" });
});

router.use(express.urlencoded({ extended: true }));
router.put("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    // Перевірка наявності тіла запиту
    if (!name || !email || !phone) {
        return res.status(400).json({ message: "missing fields" });
    }

    // Виклик функції оновлення контакту
    const updatedContact = await contacts.updateContact(contactId, {
        name,
        email,
        phone,
    });

    // Перевірка результату оновлення контакту
    if (!updatedContact) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(updatedContact);
});

module.exports = router;
