const express = require("express");
const router = express.Router();
const { schemaAdd, schemaUpdate } = require("../../validate/validate");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ message: contacts });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await getContactById(contactId);

    if (response !== null) {
      res.status(200).json({ message: response });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = schemaAdd.validate(body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const response = await addContact(body);
    res
      .status(200)
      .json({ message: `Contact ${response} added successfully!` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await removeContact(contactId);

    response
      ? res.status(200).json({ message: "contact deleted !" })
      : res.status(404).json({ message: " Error Contact Not Found" });
  } catch (error) {
    res.status(500).json({ message: "Delete error" });
    console.error(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = req.body;
    const { error } = schemaUpdate.validate(updatedContact);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const response = await updateContact(contactId, updatedContact);
    if (response === "Contact updated!") {
      res.status(200).json({ message: "Contact updated!" });
    } else if (response === "Not found") {
      res.status(404).json({ message: "Contact not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
});

module.exports = router;
