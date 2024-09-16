import contactsServices from '../services/contacts.js';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.getAll(req.query);
    res.json(contacts);
  } catch (error) {
    console.error(error);
    next();
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsServices.getById(id);
    if (contact === null) {
      return res.status('404').json(`Contact with id "${id}" not found.`);
    }
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsServices.addContact(req.body);
    res.json(newContact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

export const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await contactsServices.deleteContactById(id);
    if (deletedContact === null) {
      return res.status('404').json({ message: `Contact with id "${id}" not found.` });
    }
    res.json(deletedContact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

export const updateContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const updatedContact = await contactsServices.updateContactById(id, req.body);
    if (updatedContact === null) {
      return res.status('404').json({ message: `Contact with id "${id}" not found.` });
    }
    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { favorite } = req.body;
    if (!favorite) {
      return res.status('400').json({ message: 'missing field favorite' });
    }
    const updatedContact = await contactsServices.updateContactById(id, {
      favorite,
    });

    if (updatedContact === null) {
      return res.status('404').json({ message: `Contact with id "${id}" not found.` });
    }
    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};
