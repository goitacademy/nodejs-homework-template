const express = require("express");
const { ContactControlers } = require("../../controlers");
const router = express.Router();
const { validateBody, isValidId } = require("../../middlewares");
const { schams } = require("../../models/contact");

router.get("/", ContactControlers.getAllContacts);

router.get("/:contactId", isValidId, ContactControlers.getContactById);

router.post(
  "/",
  validateBody(schams.addSchema),
  ContactControlers.createContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schams.addSchema),
  ContactControlers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schams.updateFavoriteSchame),
  ContactControlers.updateFavorite
);

router.delete("/:contactId", isValidId, ContactControlers.deleteContact);

module.exports = router;
