const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const {
  addContactValidateMiddleware,
  updateContactValidateMiddleware,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);

    res.status(200).json(contact);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.post("/", addContactValidateMiddleware, async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);

    res.status(200).json(newContact);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    await removeContact(id);

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.put(
  "/:contactId",
  updateContactValidateMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params.contactId;
      const updatedContact = await updateContact(id, req.body);

      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
);

module.exports = router;
