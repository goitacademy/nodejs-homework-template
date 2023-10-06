import express from "express";
import contactsService from "../../models/contacts.js";
import Joi from 'joi'
import HttpError from "../../helpers/HttpError.js";


const router = express.Router();

const contactAddSchema = Joi.object({
   
  name: Joi.string().required().messages({
    "message":
      "missing required name field"
  }),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
const contactList = await contactsService.listContacts();
   res.json(contactList)
  } catch (error) {
    next(error)
  }
   
})

router.get('/:contactId', async (req, res, next) => {

  try {
 const { contactId } = req.params;
  const oneContact = await contactsService.getContactById(contactId);
    if (!oneContact) {
     return res.status(404).json({ massege : "Not found"})
    // throw HttpError(404, "Not found");
  }

     res.json(oneContact)
  } catch(error) {
   next(error)
  }
 
})

router.post('/', async (req, res, next) => {
  try {
     if (!Object.keys(req.body).length) {
            throw HttpError(400, "All fields empty");
        }

    const { error } = contactAddSchema.validate(req.body);
     if (error) {
            throw HttpError(400, error.message);
    }
    
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resalt = await contactsService.removeContact(contactId);
    if (!resalt) {
    throw HttpError(404, "Not found")
    }
    res.json({
      message : 'Delete success'
    })
   
  } catch (error) {
    next(error)
 }
})

router.put('/:contactId', async (req, res, next) => {
  try {
     if (!Object.keys(req.body).length) {
            throw HttpError(400, "All fields empty");
        }

    const { error } = contactAddSchema.validate(req.body);
     if (error) {
            throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    
    const resalt = await contactsService.updateContact(contactId, req.body);
    if (!resalt) {
    throw HttpError(404, "Not found")
    }
    res.json(resalt)
  } catch (error) {
    next(error)
  }
})

export default router;
