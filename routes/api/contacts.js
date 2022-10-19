const express = require("express");

const { cntrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/Contact");
const { validateBody, isValidId } = require("../../middlewares");

const cntrl = require("../../controlers/contacts");

const router = express.Router();

router.get("/", cntrlWrapper(cntrl.listContacts));

router.get("/:contactId", isValidId, cntrlWrapper(cntrl.getContactById));

router.post(
  "/",
  validateBody(schemas.addSchema),
  cntrlWrapper(cntrl.addContact)
);

router.delete("/:contactId", isValidId, cntrlWrapper(cntrl.removeContact));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  cntrlWrapper(cntrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  cntrlWrapper(cntrl.updateFavorite)
);

module.exports = router;
