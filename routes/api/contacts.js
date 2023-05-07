const express = require("express");
const router = express.Router();
const isValidId = require("../../middlewares/isVaildId");
const authenticate = require("../../middlewares/authenticate");

const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrl.getContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContacts);

router.put("/:contactId", authenticate, isValidId, ctrl.changeContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  ctrl.updateFavorite
);

module.exports = router;
