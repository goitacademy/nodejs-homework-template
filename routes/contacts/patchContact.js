import { Router } from "express";
import { updateContactCb } from "../../controllers/contacts";
import guard from "../../middlewares/users/guard";
import {
  validateId,
  validateUpdateFavorite,
} from "../../middlewares/contacts/validation";
const patchContactRouter = new Router();
patchContactRouter.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  updateContactCb
);
export default patchContactRouter;
