const express = require('express');
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require('../../controllers/contacts');

const router = express.Router();

// Trasy dla kontaktów
router.get('/', getAllContacts);              // GET wszystkie kontakty
router.get('/:contactId', getContactById);    // GET kontakt po ID
router.post('/', addContact);                 // POST nowy kontakt
router.put('/:contactId', updateContact);     // PUT aktualizacja kontaktu
router.delete('/:contactId', deleteContact);  // DELETE usuwanie kontaktu

// Trasa do aktualizacji pola favorite
router.patch('/:contactId/favorite', async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
