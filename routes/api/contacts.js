const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  try {
    res.status(200);
    res.json(contacts);
  } catch (error) {
    res.status(404);
    return res.json({
      message: error.message,
    });
  }

  next();
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404);
    res.json({
      message: `There is no contact with id ${req.params.contactId} in contact-list`,
    });
    return;
  }
  try {
    res.status(200);
    res.json(contact);
  } catch (error) {
    res.json({ Error: error.message });
  }
  next();
});

router.post("/", async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(200);
    res.json({ message: `Contact ${contact.name} was successfully added` });
  } catch (error) {
    res.status(400);
    res.json({ Error: error.message });
  }
  next();
});

router.delete("/:contactId", async (req, res, next) => {
  const searchContact = await getContactById(req.params.contactId);
  if (!searchContact) {
    return res.json({
      status: "404. Not Found",
      message: `There is no contact with id ${req.params.contactId} to delete`,
    });
  }
  try {
    const contact = await removeContact(req.params.contactId);
    res.status(200);
    res.json({ message: `Contact ${contact.name} was successfully deleted` });
  } catch (error) {
    res.status(404);
    res.json({ Error: error.message });
  }

  next();
});

router.put("/:contactId", async (req, res, next) => {
  const searchContact = await getContactById(req.params.contactId);
  if (!searchContact) {
    return res.json({
      status: "404. Not Found",
      message: `There is no contact with id ${req.params.contactId} to change`,
    });
  }
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    res.status(200);
    res.json({ message: `Contact ${contact.name} was successfully changed` });
  } catch (error) {
    res.status(400);
    res.json({ Error: error.message });
  }

  next();
});

module.exports = router;
