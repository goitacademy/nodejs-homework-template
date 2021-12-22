import addContact from '../../models/contacts/addContact';

const addContactController = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
}

export default addContactController;