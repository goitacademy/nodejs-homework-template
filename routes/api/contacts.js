const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  favoriteChange,
  updateContacts,
} = require("../../controllers");

const express = require("express");
const router = express.Router();
const { tryCatchWrapper } = require("../../helpers/index");
const { validateBody } = require("../../middelwares/index");
const { addContactAndUpdateSchema } = require("../../schema/contactsSchema");

router.get("/", tryCatchWrapper(getAllContacts));
router.get("/:contactId", tryCatchWrapper(getContact));
router.post(
  "/",
  validateBody(addContactAndUpdateSchema),
  tryCatchWrapper(createContact)
);
router.delete("/:contactId", tryCatchWrapper(deleteContact));
router.put(
  "/:contactId",
  validateBody(addContactAndUpdateSchema),
  tryCatchWrapper(updateContacts)
);

router.patch("/:contactId/favorite", tryCatchWrapper(favoriteChange));

module.exports = router;
