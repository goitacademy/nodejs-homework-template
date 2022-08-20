const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");
const {
  addContactSchema,
  putContactSchema,
  patchFavoriteContactSchema,
  paramsContactSchema,
} = require("../../models/contactsSchema");
const { validation } = require("../../middlewares/validation");
const { authMW } = require("../../middlewares/authMW");

const router = express.Router();

router.get(
  "/",
  authMW,
  validation(paramsContactSchema, "query"),
  async (req, res) => {
    try {
      const contacts = await listContacts(req.query, req.userId);
      res.status(200).json({ contacts });
    } catch (err) {
      res.status(404).json({ message: "Not found" });
    }
  }
);

router.get("/:contactId", authMW, async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.userId);
    if (!contact) {
      res
        .status(404)
        .json({ message: `Contact with id:${contactId} does not exist` });
      return;
    }
    res.status(200).json({ contact });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", authMW, validation(addContactSchema), async (req, res) => {
  try {
    const contact = await addContact(req.body, req.userId);
    res.status(201).json({ contact });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.delete("/:contactId", authMW, async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId, req.userId);
    if (!contact) {
      res
        .status(404)
        .json({ message: `Contact with id:${contactId} does not exist` });
      return;
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put(
  "/:contactId",
  authMW,
  validation(putContactSchema),
  async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await updateContact(contactId, req.body, req.userId);
      if (!contact) {
        res
          .status(404)
          .json({ message: `Contact with id:${contactId} does not exist` });
        return;
      }
      res.status(200).json({ contact });
    } catch (err) {
      res.status(404).json({ message: "Not found" });
    }
  }
);

router.patch(
  "/:contactId/favorite",
  authMW,
  validation(patchFavoriteContactSchema),
  async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await updateStatusContact(
        contactId,
        req.body,
        req.userId
      );
      if (!contact) {
        res
          .status(404)
          .json({ message: `Contact with id:${contactId} does not exist` });
        return;
      }
      res.status(200).json({ contact });
    } catch (err) {
      res.status(404).json({ message: "Not found" });
    }
  }
);

module.exports = router;
