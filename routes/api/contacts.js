const express = require("express");
const router = express.Router();
const {
  validateParams,
  validateBody,
  validateUpdateBody,
  checkJwt,
} = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

router.get("/", checkJwt, ctrl.listContacts);

router.get("/:contactId", validateParams, ctrl.getContactById);

router.post("/", checkJwt, validateBody, ctrl.addContact);

router.put("/:contactId", validateParams, validateBody, ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateParams,
  validateUpdateBody,
  ctrl.updateStatusContact
);

router.delete("/:contactId", validateParams, ctrl.removeContact);

module.exports = router;
