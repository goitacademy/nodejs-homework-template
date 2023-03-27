const express = require("express");

const router = express.Router();

const {
  listContactsCtrl,
  getContactByIdCtrl,
  removeContactCtrl,
  addContactCtrl,
  updateContactController,
  updateStatusContactCtrl,
} = require("../../controllers/contacts");

const { auth } = require("../../../src/middlewares");

const { controllerWrapper } = require("../../../src/helpers");

router.get("/", auth, controllerWrapper(listContactsCtrl));

router.get("/:contactId", controllerWrapper(getContactByIdCtrl));

router.post("/", controllerWrapper(addContactCtrl));

router.delete("/:contactId", controllerWrapper(removeContactCtrl));

router.put("/:contactId", controllerWrapper(updateContactController));

router.patch(
  "/:contactId/favorite",
  controllerWrapper(updateStatusContactCtrl)
);

module.exports = router;
