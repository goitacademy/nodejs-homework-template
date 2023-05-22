const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {HttpError} = require("../../helpers");

const router = express.Router();

const validateNewContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});



router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactID = `${req.params.contactId}`;
    const result = await getContactById(contactID);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {  
    const { error } = validateNewContact.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    
    const result = await addContact(req.body);
    if (!result) {
      return res.status(400).json( {message:"alredy in contact"})
    }

    res.status(201).json(result);
  } catch (error) {
    console.log(error)
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(400, "Not found");
    }
    res.status(200).json({ message: "contact deleted" })
  } catch (error) {
    next(error) 
  }  
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length){
      return res.status(400).json({ message: "missing fields" });
    }
    const { contactId } = req.params;
    const result = await updateContact(
      contactId,
      req.body
    );
    
    if (!result) {
      throw HttpError(400, "Not found");
    }
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
  
});

module.exports = router;
