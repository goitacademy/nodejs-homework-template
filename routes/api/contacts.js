const express = require("express");
const contactSchema = require("../../validators/contactValidator");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  upDateContact,
} = require("../../services/contactService");

const router = express.Router();

const handleJoiError = (error, res) => {
  res.status(400).json({ message: error.message });
};

const handleNotFoundError = (res, contactId) => {
  res.status(404).json({ message: `Not found id: ${contactId}` });
};

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);
    if (data) {
      res.json(data);
    } else {
      handleNotFoundError(res, contactId);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      handleJoiError(error, res);
    } else {
      const response = await addContact(req.body);
      res.status(201).json(response);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await removeContact(contactId);
    if (data) {
      res.json({ message: "Contact deleted" });
    } else {
      handleNotFoundError(res, contactId);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      handleJoiError(error, res);
    } else {
      const updatedContact = await upDateContact(contactId, req.body);
      if (updatedContact) {
        res.json(updatedContact);
      } else {
        handleNotFoundError(res, contactId);
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
