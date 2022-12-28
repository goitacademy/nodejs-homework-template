const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().min(9).max(14).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk"] },
    })
    .required(),
})
  .with("name", "phone")
  .with("email", "phone");

const router = express.Router();

router.get("/", async (req, res) => {
  let contactsList = null;
  await listContacts()
    .then((result) => {
      contactsList = result;
    })
    .catch((e) => console.error(e));
  res.json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    let contact = null;
    await getContactById(contactId).then((result) => {
      contact = result;
    });
    if (!contact) {
      throw Error;
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(404);
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = schema.validate(req.body);
    if (data.error) {
      throw data.error.details[0].context.key;
    }
    const contacts = await addContact(data.value);

    res.status(201).json(contacts);
  } catch (error) {
    res.status(400).json({ message: `missing required ${error} field ` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    let contacts = null;
    await removeContact(contactId).then((result) => {
      contacts = result;
    });
    if (!contacts) throw Error;
    res.status(204).json(contacts);
  } catch (error) {
    res.status(404);
    next();
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const data = schema.validate(req.body);

    if (data.error) {
      const errorField = data.error.details[0].context.key;

      return res
        .status(400)
        .json({ message: `missing required ${errorField} field` });
    }

    const id = req.params.contactId;
    const updatedContact = await updateContact(id, data.value);
    res.status(200).send(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
