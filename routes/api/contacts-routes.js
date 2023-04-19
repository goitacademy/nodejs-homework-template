const express = require("express");

const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  changeContactbyId,
  changeStatusContact,
} = require("../../controllers");

const { isValidId, authenticate } = require("../../middlewares");
const { validateBody } = require("../../utils");

const router = express.Router();
const { schemas } = require("../../models");

router.get("/", authenticate, getContacts);

router.get("/:id", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), postContact);

router.delete("/:id", authenticate, isValidId, deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  changeContactbyId
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.changeStatusSchema),
  changeStatusContact
);

module.exports = router;
