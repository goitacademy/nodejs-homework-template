import express from 'express';
import { listContacts, getContactById, removeContact, addContact, updateContact, } from '../../models/contacts.js';

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
 
    const contact = await getContactById(contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      res.json({
        status: "failure",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});


router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact deleted",
      });
    } else {
      res.json({
        status: "failure",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default router
