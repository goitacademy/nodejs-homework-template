import * as contactsModel from '../models/contactModel.js';


const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Error reading contacts from database:', error.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default listContacts;
