import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} from '../models/contacts.js';


const getAll = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};




export default {
    getAll
}