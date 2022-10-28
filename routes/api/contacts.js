const express = require("express");

const { cntrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/Contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

const cntrl = require("../../controlers/contacts");

const router = express.Router();

router.get("/", authenticate, cntrlWrapper(cntrl.listContacts));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  cntrlWrapper(cntrl.getContactById)
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  cntrlWrapper(cntrl.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  cntrlWrapper(cntrl.removeContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  cntrlWrapper(cntrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  cntrlWrapper(cntrl.updateFavorite)
);

module.exports = router;
