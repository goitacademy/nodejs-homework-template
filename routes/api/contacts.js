const express = require("express");
const {
  getAll,
  getById,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(addSchema), postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(addSchema), putContact);

module.exports = router;
