import { Router } from "express";
import { validateId } from "../../middlewares/contacts/validation";
import { removeContactCb } from "../../controllers/contacts";
import guard from "../../middlewares/guard";

const deleteRouter = new Router();

deleteRouter.delete("/:id",  [guard, validateId], removeContactCb);
export default deleteRouter;