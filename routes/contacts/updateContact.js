import { Router } from "express";
import { updateContactCb } from "../../controllers/contacts";
import wrapperError from "../../middlewares/error-handler";
import {
  validateUpdate,
  validateId,
} from "../../middlewares/contacts/validation";
import guard from "../../middlewares/guard";

const updateRouter = new Router();
updateRouter.put("/:id", [guard, validateId], wrapperError(validateUpdate), wrapperError(updateContactCb));
export default updateRouter;