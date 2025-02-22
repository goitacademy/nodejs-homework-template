import express from "express";
import { isValidID } from "../middlewares/isValidId.js";
import {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);
router.get("/contacts", authenticate, ctrlWrapper(getContacts));
router.get(
  "/contacts/:contactId",
  authenticate,
  isValidID,
  ctrlWrapper(getContactById)
);
router.post(
  "/contacts",
  authenticate,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContact)
);
router.patch(
  "/contacts/:contactId",
  authenticate,
  isValidID,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContact)
);
router.delete(
  "/contacts/:contactId",
  authenticate,
  isValidID,
  ctrlWrapper(deleteContact)
);
export default router;
