const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
} = require("../../controllers/conrollers");

const { validateSchemaContact } = require("../../schemas");
const { validateBody } = require("../../middlewares");

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", validateBody(validateSchemaContact), postContact);

router.delete("/:id", deleteContact);

router.put("/:id", validateBody(validateSchemaContact), putContact);

module.exports = router;
