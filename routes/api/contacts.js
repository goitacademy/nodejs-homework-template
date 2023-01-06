const express = require("express");

const router = express.Router();

const {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

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
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  try {
    const newContact = await addContact({ name, email, phone });

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
  const body = req.body;

  console.log("body from router: ", body);
  if (!body) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const updatedContact = await updateContact(contactId, body);

    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
  }
  res.json({ message: "template message" });
});

module.exports = router;
