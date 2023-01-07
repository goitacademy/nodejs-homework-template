const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ tlds: { deny: ["ru"] } }),
  phone: Joi.string(),
}).or("name", "email", "phone");

const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const validation = schema.validate(body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  return next();
};

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);

  if (!contact) {
    res.status(404).json({ message: "Not found" }).end();
    return;
  }

  res.json(contact);
});

router.post("/", validator(addContactSchema), async (req, res, next) => {
  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const isContactExist = await removeContact(id);

  isContactExist
    ? res.status(200).json({ message: "Contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put(
  "/:contactId",
  validator(updateContactSchema),
  async (req, res, next) => {
    const id = req.params.contactId;
    const contactChanges = req.body;
    const updatedContact = await updateContact(id, contactChanges);

    updatedContact
      ? res.status(200).json(updatedContact)
      : res.status(404).json({ message: "Not found" });
  }
);

module.exports = router;
