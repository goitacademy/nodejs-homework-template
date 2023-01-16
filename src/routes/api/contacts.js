const express = require("express");
const {
  addCont,
  getContacts,
  getContById,
  removeCont,
  updateCont,
} = require("../../controllers/contactsController");
const {
  postValidationMiddleware,
  putValidationMiddleware,
} = require("../../middlewawes/validationMiddlevares");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContById);

router.post("/", postValidationMiddleware, addCont);

router.delete("/:contactId", removeCont);

router.put("/:contactId", putValidationMiddleware, updateCont);

module.exports = router;
