const express = require("express");

const {
  getAllContacts,
  getById,
  addContact,
  updateById,
  deleteById,
} = require("../../controllers");

const bodyValidator = require("../../middlewares/bodyValidator");
const addBodyValidator = require("../../middlewares/addBodyValidator");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", addBodyValidator(schemas.addSchema), addContact);

router.put("/:contactId", bodyValidator(schemas.changeSchema), updateById);

router.delete("/:contactId", deleteById);

module.exports = router;
