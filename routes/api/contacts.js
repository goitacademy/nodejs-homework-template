const express = require("express");
const {
  addContactValidation,
  changeContactValidation,
} = require("../../middlewares/validationMiddleWare");

const {
  getContactsList,
  contactById,
  addNewContact,
  deleteContact,
  contactUpdate,
  changeContact,
} = require("../../controllers/postControllerl");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(getContactsList));

router.get("/:contactId", asyncWrapper(contactById));

router.post("/", addContactValidation, asyncWrapper(addNewContact));

router.delete("/:contactId", asyncWrapper(deleteContact));

router.put("/:contactId", addContactValidation, asyncWrapper(contactUpdate));

router.patch(
  "/:contactId",
  changeContactValidation,
  asyncWrapper(changeContact)
);

module.exports = router;
