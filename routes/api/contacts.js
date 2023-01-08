const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const { addContactShema } = require("../../shemas/contacts");
const { validateBody } = require("../../middlewares/index");

const router = express.Router();

const {
  getContact,
  getContactId,
  addNewContact,
  deleteContact,
  updteContact,
} = require("../../controller/contacts-controller");

router.get("/", tryCatchWrapper(getContact));

router.get("/:contactId", tryCatchWrapper(getContactId));

router.post("/", validateBody(addContactShema), tryCatchWrapper(addNewContact));

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validateBody(addContactShema),
  tryCatchWrapper(updteContact)
);

module.exports = router;
