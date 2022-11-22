const express = require("express");
const {
  getContactList,
  addContactById,
  deleteContactById,
  getContactsById,
  updateContactById,
} = require("../../controllers/controller");
const { validation } = require("../../middlewares/validationBody");
const { addPostSchema, updatePutSchema } = require("../../schemas/schema");

const router = express.Router();

router.get("/", getContactList);

router.get("/:contactId", getContactsById);

router.post("/", validation(addPostSchema), addContactById);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId", validation(updatePutSchema), updateContactById);

module.exports = router;
