const express = require("express");
const schema = require("../../utils/validation/validation");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  let contactsList = await listContacts();
  res.json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    let contact = await getContactById(contactId);
    if (!contact) {
      throw new Error(errorMessage);
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(404);
    next();
  }
});

router.post("/", async (req, res) => {
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
    let contacts = await removeContact(contactId);
    if (!contacts) throw new Error(errorMessage);
    res.status(204).json(contacts);
  } catch (error) {
    res.status(404);
    next();
  }
});

router.put("/:contactId", async (req, res) => {
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
