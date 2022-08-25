const express = require("express");
const { randomUUID } = require("crypto");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../dbActions/actions");
const {
  validateAddContactFields,
  validateUpdateContactFields,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", validateAddContactFields, async (req, res, next) => {
  try {
    const newContacct = { id: randomUUID(), ...req.body };
    const isContactNameInList = await addContact(newContacct);

    if (isContactNameInList) {
      return res.status(400).json({
        message: `Contact with name ${req.body.name} is already in the list`,
      });
    }
    res.status(201).json(newContacct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const isRemoved = await removeContact(id);
  if (!isRemoved) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put(
  "/:contactId",
  validateUpdateContactFields,
  async (req, res, next) => {
    const id = req.params.contactId;

    const updatedContact = await updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  }
);

module.exports = router;
