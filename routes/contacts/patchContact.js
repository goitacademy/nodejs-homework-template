import { Router } from "express";
import { updateContactCb } from "../../controllers/contacts";
import {
  validateId,
  validateUpdateFavorite,
} from "../../middlewares/contacts/validation";
import guard from "../../middlewares/guard";
import wrapperError from "../../middlewares/error-handler";

const patchContactRouter = new Router();
patchContactRouter.patch(
  "/:id/favorite",
  [guard, validateUpdateFavorite],
  wrapperError(validateId),
  wrapperError(updateContactCb)
);
export default patchContactRouter;