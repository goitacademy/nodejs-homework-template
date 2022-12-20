const express = require("express");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const router = express.Router();
const {
  addContactValidation,
  putContactValidation,
  favoriteValidation,
} = require("../../middlewares/validationMiddlewares");
const { authenticate } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

router.get("/", authenticate, asyncWrapper(ctrl.getContacts));

router.get("/:contactId", authenticate, asyncWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  addContactValidation,
  asyncWrapper(ctrl.addContact)
);

router.delete("/:contactId", authenticate, asyncWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  authenticate,
  putContactValidation,
  asyncWrapper(ctrl.changeContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  favoriteValidation,
  asyncWrapper(ctrl.updateStatus)
);

module.exports = router;
