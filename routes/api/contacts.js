const express = require("express");
const { tryCatchWrapper } = require("../../helpers");

const {
  getContactList,
  getContactId,
  createContact,
  deleteContact,
  refreshContact,
} = require("../../controllers/contacts.controller");
const { validateBody } = require("../../middlewares");
const { addMoviesSchema } = require("../../schemas");
const router = express.Router();

router.get("/", tryCatchWrapper(getContactList));

router.get("/:contactId", tryCatchWrapper(getContactId));

router.post("/", validateBody(addMoviesSchema), tryCatchWrapper(createContact));

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validateBody(addMoviesSchema),
  tryCatchWrapper(refreshContact),
);

module.exports = router;
