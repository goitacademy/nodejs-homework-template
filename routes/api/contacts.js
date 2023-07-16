const express = require("express");

const { checkID, validateBody } = require("../../middlewares");

const { validateSchema, ubdateFavouriteSchema } = require("../../models");

const router = express.Router();

const ctlr = require("../../controllers/contacts");

router.get("/", ctlr.getAllContacts);

router.get("/:contactId", checkID, ctlr.getContactById);

router.post("/", validateBody(validateSchema), ctlr.addContact);

router.delete("/:contactId", checkID, ctlr.deleteContact);

router.put("/:contactId", validateBody(validateSchema), checkID, ctlr.changeContact);

router.patch(
  "/:contactId/favourite",
  validateBody(ubdateFavouriteSchema),
  checkID,
  ctlr.ubdateFavourite
);

module.exports = router;

// phnWUGwugtx2AIiF
