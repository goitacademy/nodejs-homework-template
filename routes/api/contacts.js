const express = require("express");

const {
  contacts: {
    getContacts,
    findContactById,
    addNewContact,
    deleteContact,
    updContact,
  },
} = require("../../controllers");

const { validation, ctrllWrapper } = require("../../middlewares");
const { productSchema } = require("../../schemas");

const validateMiddleWate = validation(productSchema);
const router = express.Router();

router.get("/", ctrllWrapper(getContacts));

router.get("/:id", ctrllWrapper(findContactById));

router.post("/", validateMiddleWate, ctrllWrapper(addNewContact));

router.delete("/:id", ctrllWrapper(deleteContact));

router.put("/:id", validateMiddleWate, ctrllWrapper(updContact));

module.exports = router;
