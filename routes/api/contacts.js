const express = require("express");
const {
  checkId,
  checkContactData,
  checkUpdateContactData,
} = require("../../middlewares/contactsMiddleware");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    return error;
  }
});

router.use("/:contactId", checkId);

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    res.status(200).json(contact);
  } catch (error) {
    return error;
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    await removeContact(req.params.contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    return error;
  }
});

router.use("/:contactId", checkUpdateContactData);

router.put("/:contactId", async (req, res, next) => {
  console.log(req);
  try {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    return error;
  }
});

router.use("/", checkContactData);

router.post("/", async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {}
});

module.exports = router;
