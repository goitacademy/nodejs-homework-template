const express = require("express");
const {
  getContacts,
  getById,
  addNewContact,
  deleteById,
  updateById,
} = require("../../controllers/contscts");
const validateBody = require("../../middlewares/validateBody");
const addSchema = require("../../schemas/contacts");
const router = express.Router();

router.get("/", getContacts);

// router.get("/:id", getById);

// router.post("/", validateBody(addSchema), addNewContact);

// router.delete("/:id", deleteById);

// router.put("/:id", validateBody(addSchema), updateById);

module.exports = router;
