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
const { validateBody, auth } = require("../../middelwares/index");
const { addContactAndUpdateSchema } = require("../../schema/contactsSchema");

router.get("/", auth, tryCatchWrapper(getAllContacts));
router.get("/:contactId", auth, tryCatchWrapper(getContact));
router.post(
  "/",
  validateBody(addContactAndUpdateSchema),
  tryCatchWrapper(createContact)
);
router.delete("/:contactId", auth, tryCatchWrapper(deleteContact));
router.put(
  "/:contactId",
  auth,
  validateBody(addContactAndUpdateSchema),
  tryCatchWrapper(updateContacts)
);

router.patch("/:contactId/favorite", auth, tryCatchWrapper(favoriteChange));

module.exports = router;
