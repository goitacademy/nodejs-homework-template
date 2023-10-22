const express = require("express");


const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,

  updateStatusContact,
} = require("../../contacts/contacts.functions");

} = require("../../models/contacts");


const { contactValidator } = require("./../../utils/validator");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await listContacts();
  return res.status(200).json(response);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getContactById(id);
    if (!response) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = contactValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const contact = await addContact(req.body);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
});


router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    removeContact(id);
    return res.status(200).json({ message: "contact deleted" });
  } catch {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = contactValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
  }
  const contact = await updateContact(contactId, req.body);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { favorite } = req.body;
    const { contactId } = req.params;
    if (!favorite && favorite !== false) {
      res.status(400).json({ message: "missing field favorite" });
    }
    const contact = await updateStatusContact(contactId, favorite);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;


