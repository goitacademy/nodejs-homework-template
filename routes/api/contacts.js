const express = require("express");
const router = express.Router();

const {
  contactValidation,
  contactFavoriteValidation,
} = require("../../validator");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const response = await listContacts();
  res.status(200).json(response);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", contactValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name) {
    return res.status(400).json({ message: "missing required name field" });
  } else if (!email) {
    return res.status(400).json({ message: "missing required email field" });
  } else if (!phone) {
    return res.status(400).json({ message: "missing required phone field" });
  }
  const addedContact = await addContact(req.body);
  res.status(201).json(addedContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  const removedContact = await removeContact(req.params.contactId);
  res.status(200).json(removedContact);
});

router.put("/:contactId", contactValidation, async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  const updatedContact = await updateContact(id, req.body);
  res.status(200).json(updatedContact);
});

router.patch(
  "/:contactId/favorite",
  contactFavoriteValidation,
  async (req, res, next) => {
    const id = req.params.contactId;
    if (req.body.favorite === undefined) {
      res.status(400).json({ message: "missing field favorite" });
    }
    const updatedFavoriteContact = await updateFavorite(id, req.body);
    if (!updatedFavoriteContact) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).json(updatedFavoriteContact);
    }
  }
);

module.exports = router;
