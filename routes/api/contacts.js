
import  express  from 'express';
import { nanoid } from 'nanoid';

import  { listContacts, getContactById, addContact, removeContact, updateContact } from '../../models/contacts.js';   

const router = express.Router()

router.get('/', async (req, res, next) => {
 try {
  const contacts = await listContacts();
  res.status(200).json(contacts)
 } catch (e) {
  console.log(e);
  res.status(500).json({ message: "Internal Server Error" });
 }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const getById = await getContactById(contactId);
    if (getById) {
      return res.json(getById)
    } else {
      res.status(404).json({ message: "Not Found" })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal Server Error" });
  }

})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields"})
  }
  try {
    const id = nanoid()
    const newContact = await addContact({id, name, email, phone})
    return res.status(201).json(newContact)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { id } = req.params
  try {
    const contactToDelete = await removeContact(id)
    if (contactToDelete) {
      res.status(200).json({ message: "Contact Deleted"});
    } else {
      res.status(404).json({ message: "Not Found"});
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: "Missing fields" });
  } 

  try {
    const updatedContact = await updateContact(contactId, { name, email, phone });
    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export { router }
