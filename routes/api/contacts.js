const express = require("express");

const router = express.Router();

const contactsFunc = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const list = await contactsFunc.listContacts();
  console.log("Contacts:");
  console.log(list);
  res.status(200).json(list);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactsFunc.getContactById(req.params.contactId);
  
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "missing required name - field",
    });
  }

  const newContact = contactsFunc.addContact(req.body);

  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const contacts = await contactsFunc.listContacts();
  const newContacts = await contactsFunc.removeContact(String(contactId));

  if (newContacts.length === contacts.length) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  res.status(200).json({
    message: `contact deleted`,
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }
  const updateContact = await contactsFunc.updateContact(contactId, req.body);

  if (updateContact.message === "validationError") {
    return res
      .status(404)
      .json({ message: "validation failed, " + updateContact.err.message });
  }
  if (!updateContact) {
    return res.status(404).json({ message: "not found" });
  }
  return res.status(200).json({ message: "contact updated" });
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    return res.status(400).json({message:"missing field favorite"})
  }
  const updateStatus = await contactsFunc.updateStatusContact(contactId, req.body)
  if (updateStatus.message === "validationError") {
    return res
      .status(404)
      .json({ message: "validation failed, " + updateStatus.err.message });
  }
  if (!updateStatus) {
  return res.status(404).json({ message: "not found" });
  }
  return res.status(200).json(updateStatus);

})


module.exports = router;
