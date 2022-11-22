const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { idValidation, auth } = require("../../middlewares");

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", auth, idValidation, ctrl.getContactById);

router.post("/", auth, ctrl.addContact);

router.delete("/:contactId", auth, idValidation, ctrl.removeContact);

router.put("/:contactId", auth, idValidation, ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  auth,
  idValidation,
  ctrl.updateStatusContact
);

module.exports = router;
