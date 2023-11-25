const { v4: uuidv4 } = require('uuid');
const { loadContacts, saveContacts, validateContact } = require('../../controller/contacts/');

const addContacts = async (req, res) => {
  try {
    const contacts = await loadContacts();
    const { error } = validateContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: false,
    };

    contacts.push(newContact);
    await saveContacts(contacts);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = addContacts;
