const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contactsData");

// Валідація даних POST-маршруту
const validateContact = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(contact);
};
// Отримати всі контакти
router.get("/", async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Отримати контакт за його id
router.get("/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    const contact = await getContactById(contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Додати новий контакт
router.post('/', async (req, res) => {
  try {
    const { error } = validateContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, phone } = req.body;

    const newContact = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
    };

    await addContact(newContact);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Видалити контакт за його id
router.delete("/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    const removedContact = await removeContact(contactId);

    if (removedContact) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Оновити контакт за його id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const { error } = validateContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await updateContact(id, { name, email, phone });

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
