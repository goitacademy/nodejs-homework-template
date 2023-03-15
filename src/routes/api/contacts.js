const express = require("express");

const router = express.Router();

const {
  listContactsCtrl,
  getContactByIdCtrl,
  removeContactCtrl,
  addContactCtrl,
  updateContactCtrl,
  updateStatusContactCtrl,
} = require("../../controllers/contacts");

const { auth } = require("../../middlewares");

const { controllerWrapper } = require("../../helpers");

router.get("/", auth, controllerWrapper(listContactsCtrl));

router.get("/:contactId", controllerWrapper(getContactByIdCtrl));

router.post("/", controllerWrapper(addContactCtrl));

router.delete("/:contactId", controllerWrapper(removeContactCtrl));

router.put("/:contactId", controllerWrapper(updateContactCtrl));

router.patch(
  "/:contactId/favorite",
  controllerWrapper(updateStatusContactCtrl)
);

module.exports = router;
