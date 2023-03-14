const express = require("express");
const { checkUserId } = require("../../middlewares/middlewares.js");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

const { userValidator } = require("../../utils/validators.js");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.json(contacts);
});

router.post("/", async (req, res, next) => {
  try {
    const result = await userValidator(req.body);

    if (result.error) {
      console.log("error");
      const errorMessage = result.error.details[0].message;

      res.status(400).json({ message: errorMessage });
    }
    const contact = await addContact(req.body);

    res.status(201).json(contact);
  } catch (error) {
    console.log(error);
  }
});

router.use("/:contactId", checkUserId);

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);

  res.json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await removeContact(id);

  res.status(200).json(contact);
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await updateContact(id, req.body);

  res.status(200).json(contact);
});

module.exports = router;
