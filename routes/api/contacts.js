const express = require("express");

const {
  getAllContacts,
  getContactById,
  addContact,
  ubdateContactById,
  ubdateFavourite,
  deleteContactById,
} = require("../../controllers/contacts");

const { checkID, validateBody } = require("../../middlewares");

const { validateSchema, ubdateFavouriteSchema } = require("../../models");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", checkID, getContactById);

router.post("/", validateBody(validateSchema), addContact);

router.put("/:contactId", validateBody(validateSchema), checkID, ubdateContactById);

router.patch(
  "/:contactId/favourite",
  validateBody(ubdateFavouriteSchema),
  checkID,
  ubdateFavourite
);

router.delete("/:contactId", checkID, deleteContactById);

module.exports = router;
