const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { contacts: ctrl } = require("../../controllers");
const {
  addContactValidateMiddleware,
  updateContactValidateMiddleware,
  validateUpdateContactStatus,
  authMiddleware,
} = require("../../middlewares");

const router = express.Router();

router.use(authMiddleware);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", addContactValidateMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  updateContactValidateMiddleware,
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validateUpdateContactStatus,
  ctrlWrapper(ctrl.updateStatusById)
);

module.exports = { contactsRouter: router };
