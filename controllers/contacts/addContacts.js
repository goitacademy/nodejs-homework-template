const { v4: uuidv4 } = require('uuid');
const { loadContacts, saveContacts, validateContact } = require('../contacts');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const addContacts = async (req, res) => {
  try {
    const contacts = await loadContacts();
    const { error } = validateContact(req.body);

    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.details[0].message });
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
    res.status(HTTP_STATUS.CREATED).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = addContacts;
