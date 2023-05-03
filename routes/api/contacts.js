import { Router } from "express";
import { listContacts, getContactById, addContact, removeContact, updateContact } from "../../models/contacts.js";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
  phone: Joi.number().integer().required()
})

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

  try {
    Joi.attempt(user, schema);
    const newUser = await addContact(user);
    return res.status(201).json({ newUser })
  } catch (error) {
    return res.status(400).send(error.details[0].message)
  }

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
