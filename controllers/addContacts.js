import * as contactsModel from '../models/contactModel.js';


const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsModel.addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default addContact;