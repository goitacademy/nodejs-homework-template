import { Router } from "express";
import { listContacts, getContactById, addContact, removeContact, updateContact } from "../../models/contacts.js";

export const contactsRouter = Router();

contactsRouter.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).json({ contacts })
})

contactsRouter.get('/:contactId', async (req, res, next) => {
  const requestedContact = await getContactById(req.params.contactId)

  if (!requestedContact) return res.status(404).send({ message: 'Not found' });
  return res.status(200).json({ requestedContact })
})

contactsRouter.post('/', async (req, res, next) => {
  const user = req.body;
  const newUser = await addContact(user);
  res.status(201).json({ newUser })
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
  const contactToDeleteID = req.params.contactId

  if (!contactToDeleteID) {
    return res.status(404).send({ message: 'Not found' })
  } else {
    await removeContact(contactToDeleteID);
    return res.status(200).json({ message: "Contact deleted" })
  };

})

contactsRouter.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

//module.exports = router
