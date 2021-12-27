import { Router } from "express";
import { updateContactCb } from "../../controllers/contacts";

import {
  validateUpdate,
  validateId,
} from "../../middlewares/contacts/validation";
const updateRouter = new Router();
updateRouter.put("/:id", validateId, validateUpdate, updateContactCb);
export default updateRouter;
