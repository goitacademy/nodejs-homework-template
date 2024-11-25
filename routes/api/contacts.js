const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
router.get("/", async (req, res) => {
  try {
    const contactsList = await listContacts();
    res.status(200).send(contactsList);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const getContactId = await getContactById(req.params.contactId);
    if (getContactId.length === 0) {
      throw new Error();
    }
    return res.status(200).send(getContactId);
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = schema.validate(req.body);
    if (data.error) {
      const err = data.error.details[0].context.key;
      throw new Error(`${err}`);
    }
    const newContact = await addContact(data.value);
    return res.status(201).json(newContact);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `missing required ${error.message} field` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    await removeContact(req.params.contactId);

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res) => {
  try {
    const data = schema.validate(req.body);
    if (data.error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const updateByContact = await updateContact(
      req.params.contactId,
      data.value
    );
    return res.status(201).json(updateByContact);
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
