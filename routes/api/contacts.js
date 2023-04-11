const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const validation = require("../../models/validation");
const contactsSchema = require("../../models/schemas");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(res.status(404).json({ message: "Not found" }));
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await getContactById(contactId);
    res.status(200).json(contacts);
  } catch (error) {
    next(res.status(404).json({ message: "Not found" }));
  }
});

router.post("/", validation(contactsSchema), async (req, res, next) => {
  try {
    const contacts = await addContact(req.body);
    res.status(201).json(contacts);
  } catch (error) {
    next(res.status(400).json({ message: "missing required name field" }));
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(res.status(404).json({ message: "Not found" }));
  }
});

router.put(
  "/:contactId",
  validation(contactsSchema),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      await updateContact(contactId, req.body);
      res.status(200).json({ message: "contact Updatet" });
    } catch (error) {
      next(res.status(404).json({ message: "Not found" }));
    }
  }
);

module.exports = router;
