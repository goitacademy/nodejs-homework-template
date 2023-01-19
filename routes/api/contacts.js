const express = require("express");

const { validation } = require("../../middlewares");
const { joiSchema } = require("../../model/contact");
const { ErrorHttp, ctrlWrapper } = require("../../helpers/index.js");
const { contacts: ctrl } = require("../../controllers");
// // const {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact,
// } = require("../../models/contacts");

// const { validation } = require("../../middlewares");
// const { joiSchema } = require("../../model/contact");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

// router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

// router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

// router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateById));

module.exports = router;
