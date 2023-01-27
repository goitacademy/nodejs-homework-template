const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers");
const { controllers: ctrl } = require("../../controllers");

const { validation } = require("../../middlewares/validationMiddleware");
const { postSchema, patchSchema } = require("../../models/contact.js");
const postValidation = validation(postSchema);
const patchValidation = validation(patchSchema);

router.get("/", asyncWrapper(ctrl.listContactsController));

router.get("/", asyncWrapper(ctrl.listContactsController));

router.get("/:id", asyncWrapper(ctrl.getByIdController));

router.post("/", postValidation, asyncWrapper(ctrl.addContactController));

router.delete("/:id", asyncWrapper(ctrl.removeContactController));

router.patch("/:id/favorite", asyncWrapper(ctrl.updateStatusContactController));

router.put("/:id", patchValidation, asyncWrapper(ctrl.updateContactController));

module.exports = { contactsRouter: router };
