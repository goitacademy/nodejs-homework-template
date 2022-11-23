const express = require("express");
const controllers = require("../../controllers/contacts");
const { contactSchema } = require("../../models");
const { validationBody, isValidId, authenticate } = require("../../middlewares");
const { controllerlWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", authenticate, controllerlWrapper(controllers.getAll));

router.get("/:contactId", authenticate, isValidId, controllerlWrapper(controllers.getContactById));

router.post("/", authenticate, validationBody(contactSchema.add), controllerlWrapper(controllers.addContact));

router.delete("/:contactId", authenticate, isValidId, controllerlWrapper(controllers.deleteContactById));

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validationBody(contactSchema.add),
  controllerlWrapper(controllers.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validationBody(contactSchema.updateFavorite),
  controllerlWrapper(controllers.updateFavoriteContactById)
);

module.exports = router;
