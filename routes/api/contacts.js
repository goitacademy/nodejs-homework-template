
import express from "express";
import Joi from "joi";
import 
  {
  getContactById,
  listContacts,
  removeContact,
  addContact,
  updateContactById,
  
}
 from "../../models/contacts.js";
 import HttpError from "../../helpers/index.js";
 const router = express.Router();

 const ContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" required field`,
  }),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});


router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw HttpError(404, `Not found`);
    }
    res.json(contact);
  } catch(error) {
    next(error);
  }
 
})

router.post('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }
    const { error } = ContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch(error) {
    next(error);
  }



  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, `not found`);
    }

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {

  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }
    const { error } = ContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const result = await updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, `not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }

})



export default router
