import { Router } from "express";
import { updateContactCb } from "../../controllers/contacts";
import {
  validateId,
  validateUpdateFavorite,
} from "../../middlewares/contacts/validation";
const patchContactRouter = new Router();
patchContactRouter.patch(
  "/:id/favorite",
  validateId,
  validateUpdateFavorite,
  updateContactCb
);
export default patchContactRouter;
