const express = require("express");

const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

const { tryCatchWrapper } = require("../../helpers");

const ctrlContact = require("../../controllers/contactsController");

const router = new express.Router();

router.get("/", tryCatchWrapper(ctrlContact.getContacts));

router.get("/:id", tryCatchWrapper(ctrlContact.getById));

router.post(
  "/",
  addContactValidation,
  tryCatchWrapper(ctrlContact.postContact)
);

router.delete("/:id", tryCatchWrapper(ctrlContact.deleteContact));

router.put(
  "/:id",
  putContactValidation,
  tryCatchWrapper(ctrlContact.updateContact)
);

router.patch("/:id/favorite", tryCatchWrapper(ctrlContact.updateStatus));

module.exports = router;
