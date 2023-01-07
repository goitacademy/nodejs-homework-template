const express = require("express");
const router = express.Router();

const {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactSchema,
  updateContactSchema,
} = require("../../validations/contact");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await getContactsList();

    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  const { value, error } = addContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: `Missing required ${error.details[0].path[0]} field or invalid format of ${error.details[0].path[0]} `,
    });
    // return res.status(400).json({ message: error?.details[0].message });
  }

  try {
    const newContact = await addContact(value);

    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const isContactExist = await getContactById(contactId);

    if (!isContactExist) {
      return res.status(404).json({ message: "Not found" });
    }

    await removeContact(contactId);

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  // const body = req.body;

  const { value, error } = updateContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: `Invalid format of ${error.details[0].path[0]}`,
    });
    // return res.status(400).json({ message: error?.details[0].message });
  }

  try {
    const updatedContact = await updateContact(contactId, value);

    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
  }
  res.json({ message: "template message" });
});

module.exports = router;
