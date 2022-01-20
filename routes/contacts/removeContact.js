import { Router } from "express";
import { validateId } from "../../middlewares/contacts/validation";
import { removeContactCb } from "../../controllers/contacts";
import guard from "../../middlewares/guard";
import wrapperError from "../../middlewares/error-handler";

const deleteRouter = new Router();

deleteRouter.delete("/:id",  [guard, validateId], wrapperError(removeContactCb));
export default deleteRouter;