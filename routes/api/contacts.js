const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getById,
  add,
  updateContactById,
  delContactById,
  updateStatusContact,
} = require("../../controllers/contacts");

const {joiSchema} = require("../../models/contact");
const {validation} = require("../../middlewares");

const validationMiddleware = validation(joiSchema);



router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", delContactById);

router.patch("/:contactId", updateContactById);

router.patch("/:contactId/favorite", updateStatusContact);


module.exports = router;
