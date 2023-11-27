import express from "express";
import {
  ctrlWrapper,
  validateBody,
  validateQueryParam,
} from "../../decorators/index.js";
import {
  add,
  contactGetById,
  contactsGet,
  remove,
  updateById,
  updateStatusContact,
} from "../../controllers/contacts-controller.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import {
  contactAddSchema,
  contactPatchFavorite,
  contactUpdateSchema,
} from "../../schemas/contacts-schema.js";
import { queryGetContactsSchema } from "../../schemas/query-schema.js";

const contactsRouter = express.Router();

contactsRouter.use(ctrlWrapper(authenticate));

contactsRouter.get(
  "/",
  validateQueryParam(queryGetContactsSchema),
  ctrlWrapper(contactsGet)
);

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(contactGetById));

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  ctrlWrapper(add)
);

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(remove));

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  ctrlWrapper(updateById)
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactPatchFavorite),
  ctrlWrapper(updateStatusContact)
);

export default contactsRouter;
