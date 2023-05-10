const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const isValidId = require("../../middlewares/isValidId");

router.get("/", controllers.listContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post("/", controllers.addContact);

router.delete("/:contactId", isValidId, controllers.removeContact);

router.put("/:contactId", isValidId, controllers.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  controllers.updateStatusContact
);

module.exports = router;
