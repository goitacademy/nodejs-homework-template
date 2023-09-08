import express from "express"
import contacts from "../../models/contacts.js"
import Joi from "joi";

const router = express.Router()

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
});
const contactsUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().messages({
    "any.required": `missing required name field`,
  }),
  phone: Joi.string().messages({
    "any.required": `missing required name field`,
  }),
});

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts()
  res.json(result)
})

router.get('/:contactId', async (req, res, next) => {

  try {
      const { contactId } = req.params;
      const result = await contacts.getContactById(contactId);
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
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
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
    const existingContact = await contacts.getContactById(contactId);
    if (!existingContact) {
      throw new Error("Not Found");
    }

    if (req.body.name !== undefined) {
      existingContact.name = req.body.name;
    }
    if (req.body.email !== undefined) {
      existingContact.email = req.body.email;
    }
    if (req.body.phone !== undefined) {
      existingContact.phone = req.body.phone;
    }

    const updatedContact = await contacts.updateContactById(
      contactId,
      existingContact
    );
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});
export default router
