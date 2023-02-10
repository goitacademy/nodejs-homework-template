const express = require("express");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const router = express.Router();
const {
  addContactValidation,
  putContactValidation,
  favoriteValidation,
} = require("../../middlewares/validationMiddlewares");
const { contacts: ctrl } = require("../../contollers");

router.get("/", asyncWrapper(ctrl.getContacts));

router.get("/:contactId", asyncWrapper(ctrl.getContactById));

router.post("/", addContactValidation, asyncWrapper(ctrl.addContact));

router.delete("/:contactId", asyncWrapper(ctrl.deleteContact));

router.put("/:contactId", putContactValidation, asyncWrapper(ctrl.changeContact));

router.patch("/:contactId/favorite", favoriteValidation, asyncWrapper(ctrl.updateStatus));

module.exports = router;
