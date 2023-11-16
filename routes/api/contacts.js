const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();


router.get("/", async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.status(200).json({ message: "template message", data: contactsList });
})
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json({ message: "Contact have been found", data: contact });
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "missing required name field" });
    }

    // const newContact = {
    //   name,
    //   email,
    //   phone,
    // };

    const addedContact = await contacts.addContact({ ...req.body });
    res
      .status(201)
      .json({ message: "Contact added successfully", data: addedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const removedContact = await contacts.removeContact(contactId);

    if (!removedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res
      .status(200)
      .json({ message: "Contact completely removed", data: removedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const updatedData = req.body;

  try {
    const existingContact = await contacts.getContactById(contactId);

    if (!existingContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updatedContact = await contacts.updateContact(contactId, updatedData);

    if (!updatedContact) {
      return res.status(500).json({ message: "Failed to update contact" });
    }

    res
      .status(200)
      .json({ message: "Contact updated successfully", data: updatedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
