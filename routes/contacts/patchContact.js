import { Router } from "express";
import { updateContactCb } from "../../controllers/contacts";
import {
  validateId,
  validateUpdateFavorite,
} from "../../middlewares/contacts/validation";
import guard from "../../../midllewares/guard";

const patchContactRouter = new Router();
patchContactRouter.patch(
  "/:id/favorite",
  [guard, validateUpdateFavorite],
  validateId,
  updateContactCb
);
export default patchContactRouter;