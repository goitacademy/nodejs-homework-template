const express = require("express");

const { tryCatchWrapper } = require("../../helpers");

const validate = require("../../middlewares/validation");
const ctrlContact = require("../../controllers/contacts");

const router = new express.Router();

router.get("/", tryCatchWrapper(ctrlContact.getContacts));

router.get("/:id", tryCatchWrapper(ctrlContact.getById));

router.post(
  "/",
  validate.addContactValidation,
  tryCatchWrapper(ctrlContact.postContact)
);

router.delete("/:id", tryCatchWrapper(ctrlContact.deleteContact));

router.put(
  "/:id",
  validate.putContactValidation,
  tryCatchWrapper(ctrlContact.updateContact)
);

router.patch("/:id/favorite", tryCatchWrapper(ctrlContact.updateStatus));

module.exports = router;
