const express = require("express");
const {
  getAll,
  getById,
  add,
  deleteContactById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");

const {
  contactSchema,
  updateSchema,
  schemaUpdateStatus,
} = require("../../validation");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(getAll));

router.get("/:contactId", authenticate, controllerWrapper(getById));

router.post(
  "/",
  authenticate,
  validation(contactSchema),
  controllerWrapper(add)
);

router.delete("/:contactId", controllerWrapper(deleteContactById));

router.put(
  "/:contactId",
  authenticate,
  validation(updateSchema),
  controllerWrapper(updateById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(schemaUpdateStatus),
  controllerWrapper(updateStatusContact)
);

module.exports = router;
