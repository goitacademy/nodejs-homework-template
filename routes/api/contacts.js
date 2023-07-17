const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
} = require("../../controllers/conrollers");

const { schemaContactValidator } = require("../../schemas");
const { validateBody } = require("../../middlewares");

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", validateBody(schemaContactValidator), postContact);

router.delete("/:id", deleteContact);

router.put("/:id", validateBody(schemaContactValidator), putContact);

module.exports = router;
