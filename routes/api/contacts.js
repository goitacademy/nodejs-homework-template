const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const { validateContact } = require("../../models/validateContacts");
const { contactSchema } = require("../../models/contactsSchema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(200).json(await listContacts());
});

router.get(`/:id`, async (req, res, next) => {
  const { id } = req.params;
  if (id === -1) {
    res.status(404).json({ message: "Not Found" });
  }
  res.status(200).json(await getContactById(id));
});

router.post("/", async (req, res, next) => {
  try {
    const validatedContact = validateContact(contactSchema);
    const { error } = validatedContact(req.body);
    if (error) {
      return res.status(400).json({ message: "Missing required name field" });
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  } else {
    removeContact(contactId);
    res.status(200).json({ message: "Contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const validatedContact = validateContact(contactSchema);
    const { error } = validatedContact(req.body);
    if (error) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const result = await updateContact(contactId, req.body);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(504).json({ message: "Server error!" });
  }
});

module.exports = router;
