const express = require("express");

const router = express.Router();

const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contacts");

const {auth} =require('../../middlewares');

const {controllerWrapper} = require('../../helpers');

router.get("/", auth, controllerWrapper(listContactsController));

router.get("/:contactId", controllerWrapper(getContactByIdController));

router.post("/", controllerWrapper(addContactController));

router.delete("/:contactId", controllerWrapper(removeContactController));

router.put("/:contactId", controllerWrapper(updateContactController));

router.patch("/:contactId/favorite", controllerWrapper(updateStatusContactController));

module.exports = router;
