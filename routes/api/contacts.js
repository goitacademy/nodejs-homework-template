const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");

const { contactSchema } = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error listing contacts:", error);
    return res.status(500).send("Something went wrong");
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error getting contact:", error);
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const contact = await addContact(req.body);
    return res.status(201).json(contact);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong!");
  }
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    const removed = await removeContact(contactId);
    if (removed) {
      return res.status(200).send("Contact deleted");
    } else {
      return res.status(404).send("Contact not found");
    }
  } catch (err) {
    console.error("Error deleting contact:", err);
    return res.status(500).send("Something went wrong");
  }
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  if (!contactId) {
    return res.status(400).send("Id is required to perform update");
  }
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    await updateContact(contactId, req.body);
    return res.status(200).send("Contact successfully updated!");
  } catch (err) {
    console.error("Error updating contact:", err);
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
