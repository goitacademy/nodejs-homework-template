const express = require("express");

const {validation, ctrlWrapper} = require("../../middlewares");
const {contactSchema} = require("../../schemas");
const {contacts: ctrl} = require("../../controllers");


const validateMiddleware = validation(contactSchema);

const router = express.Router();


 router.get("/", ctrl.getAll);
// ctrlWrapper(ctrl.getAll));

 router.get("/:contactId", ctrlWrapper(ctrl.getById));

 router.post("/",
//  validateMiddleware,
  ctrl.add);
// ctrlWrapper(ctrl.add));

 router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

 router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

module.exports = router;
