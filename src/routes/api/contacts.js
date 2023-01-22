const express = require("express");
const { add } = require("../../controllers/contacts/addNewContact");
const { change } = require("../../controllers/contacts/changeContactById");
const { get } = require("../../controllers/contacts/getAllContacts");
const { getById } = require("../../controllers/contacts/getContactById");
const { remove } = require("../../controllers/contacts/removeContactById");
const { updateStatus } = require("../../controllers/contacts/updateStatusById");

const {
  postContactValidation,
  putContactValidation,
  putchContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", postContactValidation, add);

router.delete("/:contactId", remove);

router.put("/:contactId", putContactValidation, change);

router.patch("/:contactId/favorite", putchContactValidation, updateStatus);

module.exports = router;
