const express = require("express");
const controllers = require("../../controllers/contacts");
const schema = require("../../models");
const { validationBody, isValidId } = require("../../middlewares");
const { controllerlWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", controllerlWrapper(controllers.getAll));

router.get("/:contactId", isValidId, controllerlWrapper(controllers.getContactById));

router.post("/", validationBody(schema.add), controllerlWrapper(controllers.addContact));

router.delete("/:contactId", isValidId, controllerlWrapper(controllers.deleteContactById));

router.put("/:contactId", isValidId, validationBody(schema.add), controllerlWrapper(controllers.updateContactById));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(schema.updateFavorite),
  controllerlWrapper(controllers.updateFavoriteContactById)
);

module.exports = router;
