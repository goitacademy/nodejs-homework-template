const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../schemas/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewars");

const app = express();
app.use(express.json());
const jsonParser = express.json();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  jsonParser,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  jsonParser,
  validateBody(schemas.updateSchema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;