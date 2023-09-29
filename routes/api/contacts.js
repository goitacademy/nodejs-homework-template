const express = require('express');
const router = express.Router();

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatus,
} = require("../../controllers/contacts");

const { contactSchema } = require("../../models/contact");

// Middleware do obsługi błędów
const handleError = (res, error) => {
  console.error(error);
  res.status(500).send("Something went wrong");
};

// GET wszystkich kontaktów
router.get('/', async (req, res) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

// Pobierz kontakt po ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

// Dodaj nowy kontakt
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    console.log("new contact", newContact);
    res.json(newContact);
  } catch (error) {
    handleError(res, error);
  }
});

// Usuń kontakt po ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    handleError(res, error);
  }
});

// Aktualizuj kontakt po ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Missing required name field' });
  }
  try {
    const result = await updateContact(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

// Aktualizuj status "ulubiony" kontaktu
router.patch("/:id/favorite", async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  try {
    const findContactById = await getContactById(id);
    if (!findContactById) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    const result = await updateStatus(id, favorite);
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
