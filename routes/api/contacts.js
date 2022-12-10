const express = require("express");

const {
  contacts: {
    getContacts,
    getContactById,
    addNewContact,
    deleteContact,
    updateContact,
    updateContactStatus,
  },
} = require("../../controllers");

const { validation, ctrllWrapper } = require("../../middlewares");
const { contactSchema, contactStatusSchema } = require("../../schemas");

const validateMiddleWare = validation(contactSchema);
const validateStatusMiddleWare = validation(contactStatusSchema);
const router = express.Router();

router.get("/", ctrllWrapper(getContacts));
router.get("/:id", ctrllWrapper(getContactById));
router.delete("/:id", ctrllWrapper(deleteContact));

router.post("/", validateMiddleWare, ctrllWrapper(addNewContact));

router.put("/:id", validateMiddleWare, ctrllWrapper(updateContact));
router.patch(
  "/:id/favorite",
  validateStatusMiddleWare,
  ctrllWrapper(updateContactStatus)
);

module.exports = router;
