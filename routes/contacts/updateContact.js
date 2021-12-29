import { Router } from "express";
import { updateContactCb } from "../../controllers/contacts";
import guard from "../../middlewares/users/guard";
import {
  validateUpdate,
  validateId,
} from "../../middlewares/contacts/validation";
const updateRouter = new Router();
updateRouter.put("/:id", [guard, validateId, validateUpdate], updateContactCb);
export default updateRouter;
