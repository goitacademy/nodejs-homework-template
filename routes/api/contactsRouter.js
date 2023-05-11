const express = require("express");
const Joi = require("joi");

const router = express.Router();
const { HttpError } = require("../../utils");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
 updateContact,
} = require("../../models/contacts");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = router;


router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await getContactById(contactId);
    console.log(req.params);
    if (!oneContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(oneContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await addContact(req.body);
    console.log(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await  removeContact(contactId);
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
try {
  const { error } = contactsSchema.validate(req.body);
  console.log(req.body)
    if (error) {
      throw HttpError(400, error.message);
  }
  const {contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body)
  if (!updatedContact) {
    throw HttpError(404, "not found")
  }
  res.status(200).json(updatedContact)
} catch (error) {
  next(error)
}

});

module.exports = router;
