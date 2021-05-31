const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationMongoId,
} = require("./validation");
// console.log(Contacts);
router.get("/", ctrl.getAll).post("/", validationCreateContact, ctrl.create);

router
  .get("/:contactId", validationMongoId, ctrl.getById)
  .delete("/:contactId", validationMongoId, ctrl.remove)
  .put("/:contactId", validationMongoId, validationUpdateContact, ctrl.update);

router.patch("/:contactId/inArray", validationUpdateStatusContact, ctrl.update);

module.exports = router;

console.log("1");
