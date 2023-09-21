import contacts from '../models/contacts.js';
import { ErrorStatus} from '../constants/index.js';
import { ctrlWrapper } from '../middleware/index.js';

const getAllContacts = async (req, res) => {
    const result = await contacts.listContacts();
    if (!result) throw ErrorStatus (404, 'Not found')
    res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) throw ErrorStatus (404, `Contact with id=${id} not found`);

  res.status(200).json(result);
}

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  console.log(result);
  res.status(201).json(result);
}


const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);

  if (!result) throw ErrorStatus (404, 'Not found')

  res.status(200).json({ message: "Contact deleted" });
}

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body)
  if (!result) throw ErrorStatus (404, 'Not found')
  res.status(200).json(result);
}


export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};


