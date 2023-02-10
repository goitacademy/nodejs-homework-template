const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { addValidation } = require("../../middlewares/validationMiddleware");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    if (!contactById) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ contactById, message: "success" });
  } catch (error) {
    next(error);
  }
});

router.post("/", addValidation, addContact);

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", addValidation, updateContact);

module.exports = router;
