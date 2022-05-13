const express = require("express");
const { catchErrors } = require("../../middlewares/catch-errors");
const {
  fullPostValidation,
  patchValidation,
  patchStatusValidation,
} = require("../../middlewares/validationSchema");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get(
  "/",
  catchErrors(async (req, res, next) => {
    const contact = await listContacts();

    res.status(200).json(contact);
  })
);

router.get(
  "/:contactId",
  catchErrors(async (req, res) => {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);
    if (!contactById) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json(contactById);
  })
);

router.post(
  "/",
  fullPostValidation,
  catchErrors(async (req, res) => {
    const { name, email, phone, favorite } = req.body;
    const newContact = await addContact(name, email, phone, favorite);
    res.status(201).json({ status: "success", newContact });
  })
);

router.delete(
  "/:contactId",
  catchErrors(async (req, res) => {
    const { contactId } = req.params;
    const isRemove = await removeContact(contactId);
    if (!isRemove) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  })
);

router.put(
  "/:contactId",
  fullPostValidation,
  catchErrors(async (req, res) => {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    if (!updateContactItem) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json({ status: "success", updateContactItem });
  })
);

router.patch(
  "/:contactId",
  patchValidation,
  catchErrors(async (req, res) => {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    if (!updateContactItem) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json({ status: "success", updateContactItem });
  })
);

router.patch(
  "/:contactId/favorite",
  patchStatusValidation,
  catchErrors(async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updateContactItem = await updateContact(contactId, {
      favorite,
    });
    if (!updateContactItem) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json({ status: "success", updateContactItem });
  })
);

module.exports = router;
