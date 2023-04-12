const express = require("express");

const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  changeContactbyId,
  changeStatusContact,
} = require("../../controllers");
const { validateBody } = require("../../utils");

const router = express.Router();
const { schemas } = require("../../models/contacts");

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", validateBody(schemas.addSchema), postContact);

router.delete("/:id", deleteContact);

router.put("/:id", validateBody(schemas.addSchema), changeContactbyId);

router.patch(
  "/:id/favorite",
  validateBody(schemas.changeStatusSchema),
  changeStatusContact
);

module.exports = router;
