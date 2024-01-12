const express = require("express");
const Joi = require("joi");

const router = express.Router();

let contacts = [
  {
    id: 1,
    name: "Mija Cziczi",
    email: "mijacziczi@example.com",
    phone: "111-11-11",
  },
  { id: 2, name: "Jane Doe", email: "janedoe@example.com", phone: "222-22-22" },
];

const contactForm = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required(),
});

function checkContactExists(req, res, next) {
  const contactId = parseInt(req.params.contactId);
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  next();
}

router.get("/", async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    res.json(constacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", checkContactExists, async (req, res, next) => {
  // res.json({ message: "template message" });
try {
  const contactId = parseInt(req.params.contactId);
  const contact = contacts.find((contact) => contact.id === contactId);
  res.json(contact);
} catch (error) {
  next(error);
});

router.post("/", async (req, res, next) => {
  // res.json({ message: "template message" });

  try {
    const { error } = contactForm.validate(req.body);
    if (error) {
      return res.status(400).json({ message: `Validation error: ${error.message}` });
    }
    const {name, email, phone} = req.body;
    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", checkContactExists, async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const contactId = parseInt(req.params.contactId);
    contacts = contacts.filter((contact) => contact.id !== contactId);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", checkContactExists, async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const contactId = parseInt(req.params.contactId);
    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: `Validation error: ${error.message}` });
    }

    const { name, email, phone } = req.body;
    const updatedContactIndex = contacts.findIndex((c) => c.id === contactId);
    contacts[updatedContactIndex] = { ...contacts[updatedContactIndex], name, email, phone };
    res.json(contacts[updatedContactIndex]);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
