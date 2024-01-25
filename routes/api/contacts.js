const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const validate = require("./../../utils/validators/validator");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", validate.contactValid, async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.json({ status: "success", code: 201, data: { newContact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", validate.contactUpdate, async (req, res, next) => {
  const { contactId } = req.params;
  const contactToEdit = await updateContact(contactId, req.body);

  if (!contactToEdit) {
    res.json({
      code: 404,
      message: "Not found",
    });
  } else {
    res.json({
      status: "success",
      code: 200,
      data: {
        contactToEdit,
      },
      message: "Contact has been updated successfully",
    });
  }
});

module.exports = router;
