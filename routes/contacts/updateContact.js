import { Router } from "express";
import { updateContactCb } from "../../controllers/contacts";

import {
  validateUpdate,
  validateId,
} from "../../middlewares/contacts/validation";
import guard from "../../../midllewares/guard";

const updateRouter = new Router();
updateRouter.put("/:id", [guard, validateId], validateUpdate, updateContactCb);
export default updateRouter;