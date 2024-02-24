const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../service/controllers/contactsController");

const {
  requiredContactSchema,
} = require("../../service/Schemas/contactSchema");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  const owner = req.user._id;
  try {
    const contacts = await listContacts(owner);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", auth, async (req, res, next) => {
  const userId = req.user._id;
  try {
    const contact = await getContactById(req.params.contactId, userId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  const body = req.body;
  const validation = requiredContactSchema.validate(body);

  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message });
  }

  const owner = req.user._id;
  try {
    const createdContact = { ...body, owner };
    const contact = await addContact(createdContact);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", auth, async (req, res, next) => {
  const contactId = req.params.contactId;
  const userId = req.user._id;

  try {
    const contact = await removeContact(contactId, userId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", auth, async (req, res, next) => {
  const body = req.body;
  const validation = requiredContactSchema.validate(body);

  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message });
  }

  const contactId = req.params.contactId;
  const userId = req.user._id;

  try {
    const contact = await updateContact(contactId, body, userId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", auth, async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const userId = req.user._id;

  if (!body.favorite) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  try {
    const updatedStatus = await updateStatusContact(contactId, body, userId);
    if (!updatedStatus) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedStatus);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
