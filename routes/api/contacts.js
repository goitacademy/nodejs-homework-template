import express from "express";
import contactContollers from "../../controllers/controlers.js";

import { ContactSchema } from "../../models/contactModel.js";
// import contactContollers from "../../controllers/controlers.js";

import validateBody from "../../decorators/validateBody.js";
import isValidId from "../../middlewares/IsValidId.js";

const router = express.Router();

const contactValidateBody = validateBody(ContactSchema);

router.get("/", contactContollers.getAll);

router.get("/:contactId", isValidId, contactContollers.getById);

router.post("/", isValidId, contactValidateBody, contactContollers.addContact);

router.delete(
  "/:contactId",
  isValidId,

  contactContollers.deleteById
);

router.put(
  "/:contactId",
  isValidId,
  contactValidateBody,
  contactContollers.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactValidateBody,
  contactContollers.updateFavorite
);

export default router;
