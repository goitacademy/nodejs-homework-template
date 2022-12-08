const express = require("express");
const router = express.Router();

const {
  getContactController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
  updateFavoriteController,
} = require("../../controllers/controller");

const { validationBody } = require("../../middlewares/validationBody.js");
const {
  schemaPostContact,
  schemaPutContact,
  schemaFavoriteContact,
} = require("../../schema/validationSchema");

const { asyncWrapper } = require("../../helpers/api.helpers");

router.get("/", asyncWrapper(getContactController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post(
  "/",
  validationBody(schemaPostContact),
  asyncWrapper(addContactController)
);

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.put(
  "/:contactId",
  validationBody(schemaPutContact),
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  validationBody(schemaFavoriteContact),
  asyncWrapper(updateFavoriteController)
);

module.exports = router;
