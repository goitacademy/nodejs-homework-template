const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

const { validationForPost, validationForPut } = require("./validation");

// GET all contacts (http://localhost:3000/api/contacts/)

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (contacts) {
      return res.status(200).json({ body: contacts });
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Find contact by id (e.g. http://localhost:3000/api/contacts/1)

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await getContactById(req.params.contactId);
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
});

// Add new contact (Postman: Body -> select: raw, JSON)

router.post("/", async (req, res, next) => {
  try {
    const validatePost = validationForPost(req.body).error;
    console.log(validatePost);
    if (validatePost) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }
    const contact = await addContact(req.body);
    return res.status(201).json({
      data: { contact },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Remove contact by id from the list (e.g. http://localhost:3000/api/contacts/5)

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await removeContact(contactId);
    if (deleteContact) {
      console.log(deleteContact);
      return res.status(200).json({ message: "contact deleted" });
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
});

// PUT - Contact update (e.g. http://localhost:3000/api/contacts/1)

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = validationForPut(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.status(200).json({
        data: {
          contact,
        },
      });
    }
    return res.status(404).json({ message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
