import { Router } from "express";
import { validateId } from "../../middlewares/contacts/validation";
import guard from "../../middlewares/users/guard";
import { removeContactCb } from "../../controllers/contacts";
const deleteRouter = new Router();

deleteRouter.delete("/:id", [guard, validateId], removeContactCb);
export default deleteRouter;
