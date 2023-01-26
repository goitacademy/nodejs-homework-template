const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers");
const { controllers: ctrl } = require("../../controllers");
const {
  listContactsController,
} = require("../../controllers/contacts/contacts");
const { postValidation, patchValidation } = require("../../middlewares");

router.get("/", asyncWrapper(listContactsController));

// router.get("/", asyncWrapper(ctrl.listContactsController));

router.get("/:id", asyncWrapper(ctrl.getByIdController));

router.post("/", postValidation, asyncWrapper(ctrl.addContactController));

router.delete("/:id", asyncWrapper(ctrl.removeContactController));

router.patch(
  "/:id/favorite",
  patchValidation,
  asyncWrapper(ctrl.updateStatusContactController)
);

router.put("/:id", patchValidation, asyncWrapper(ctrl.updateContactController));

module.exports = { contactsRouter: router };
