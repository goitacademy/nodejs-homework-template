import express from "express"

import { Contact } from "../../models/ContactsSchema.js";
import { contactsAddSchema } from "../../controllers/SchemaJoi.js";

const router = express.Router()


router.get('/', async (req, res, next) => {
  const result = await Contact.find()
  res.json(result)
})

router.get('/:contactId', async (req, res, next) => {

  try {
      const { contactId } = req.params;
      const result = await Contact.findById(contactId);
      if (!result) {
        throw res.status(404).json("Not Found");
      }
      res.json(result);
  } catch (error) {
      next(error);

  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
     throw res.status(400).json("missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw res.status(404).json("Not Found");
    }
    res.status(200).json("contact deleted");
  } catch (error) {
    next(error);
  }
})

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      throw new Error("Validation error");
    }
    const existingContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!existingContact) {
      throw new Error("Not Found");
    }
    res.json(existingContact);
  } catch (error) {
    next(error);
  }
})

 router.patch("/:contactId/favorite", async (req, res) => {
   try {
     const { contactId } = req.params;

     const existingContact = await Contact.findByIdAndUpdate(
       contactId,
       req.body,
       { new: true }
     );
     if (!existingContact) {
       throw new Error("Not Found");
     }
     res.json(existingContact);
   } catch (error) {
     res.json(error);
   }
 });



export default router
