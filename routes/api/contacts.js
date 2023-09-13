const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const Joi = require('joi');
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()

})

// CONTROLLERS

// GET: отримання всіх контактів
router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  console.log("It is GET", allContacts);
  res.status(200).json(allContacts);
});

// GET: отримання контакту по ід
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (contact) {
    res.status(200).json(contact);
  }
  res.status(404).json({ message: "Contact not found" });
});

// POST: додавання нового контакту
router.post("/", async (req, res, next) => {
  const { error } = addSchema.validate(req.body)
  if (error) {
  return res.status(400).json({ message: error.message })
}

  const contact = await addContact(req.body);
  if (contact) {
    res.status(201).json(contact);
  }
  res.status(400).json({message: "missing required name field"});
});

// DELETE: видалення контакту по ід
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const deleteContact = await removeContact(id);
  if (deleteContact) {
    return res.status(200).json({ message: "Contact deleted" });
  }
  res.status(404).json({ message: "Contact not found" });
});

// PUT: оновлення наявного контакту 
router.put("/:id", async (req, res, next) => {
    const { error } = addSchema.validate(req.body)
  if (error) {
  return res.status(400).json({ message: error.message })
  }
  
  const { name, email, phone } = req.body;
  const {id} = req.params;
  const updateById = await updateContact(id, {
        name,
        email,
        phone,
  });
  if (updateById) {
    res.status(200).json(updateById);
  }
  res.status(404).json({ message: "missing fields" });
});

module.exports = router;
