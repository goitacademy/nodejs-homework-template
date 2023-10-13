import express from "express";
import Joi from 'joi';
import Contacts from "../../models/contacts.js";
import { isValidObjectId } from "mongoose";


const router = express.Router();

const contactAddSchema = Joi.object({
   
  name: Joi.string().required().messages({
     "any.required": 
      "missing required 'name' field"
  }),
    email: Joi.string().required().messages({
    "any.required": 
      "missing required 'email' field"
  }),
    phone: Joi.string().required().messages({
    "any.required": 
      "missing required 'phone' field"
  }),
})
const contactFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})


router.get('/', async (req, res, next) => {
  try {
const contactList = await Contacts.find();
   res.json(contactList)
  } catch (error) {
    next(error)
  }
   
})

router.get('/:contactId', async (req, res, next) => {

  try {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      return res.status(404).json({ messege: `${contactId} not valid id` })
    }
  const oneContact = await Contacts.findById(contactId);
    if (!oneContact) {
     return res.status(404).json({ messege : "Not found"})
  }

     res.json(oneContact)
  } catch(error) {
   next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
       return res.status(400).json({ message : "All fields empty"})
        }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.message})
    }
  
    const newContact = await Contacts.create(req.body);
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
     if (!isValidObjectId(contactId)) {
      return res.status(404).json({ messege: `${contactId} not valid id` })
    }
    const resalt = await Contacts.findByIdAndDelete(contactId);
    if (!resalt) {
      return res.status(404).json({ messege : "Not found"})
    }
    res.json({
      message :"contact deleted"
    })
   
  } catch (error) {
    next(error)
 }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
       return res.status(400).json({ messege : "missing fields"})
        }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.message})
    }
    const { contactId } = req.params;
     if (!isValidObjectId(contactId)) {
      return res.status(404).json({ messege: `${contactId} not valid id` });
    }
    
    const resalt = await Contacts.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!resalt) {
      return res.status(404).json({ messege : "Not found"})
    }
    res.json(resalt)
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => { 
  try {
      if (!Object.keys(req.body).length) {
       return res.status(400).json({ messege : "missing field favorite"})
    }
      const { error } = contactFavoriteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.message})
    }

    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      return res.status(404).json({ messege: `${contactId} not valid id` });
    }
    const result = await Contacts.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      return res.status(404).json({ messege : " Not found "})
    }

    res.json(result);
} catch (error) {
    next(error)
  }
})


export default router;
