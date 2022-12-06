const express = require("express");

const {
  contacts: {
    getContacts,
    getContactById,
    addNewContact,
    deleteContact,
    updateContact,
  },
} = require("../../controllers");

const { validation, ctrllWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const validateMiddleWate = validation(contactSchema);
const router = express.Router();

router.get("/", ctrllWrapper(getContacts));

router.get("/:id", ctrllWrapper(getContactById));

router.post("/", validateMiddleWate, ctrllWrapper(addNewContact));

router.delete("/:id", ctrllWrapper(deleteContact));

router.put("/:id", validateMiddleWate, ctrllWrapper(updateContact));

module.exports = router;
