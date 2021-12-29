import { Router } from "express";
import { validateId } from "../../middlewares/contacts/validation";
import { removeContactCb } from "../../controllers/contacts";

const deleteRouter = new Router();

deleteRouter.delete("/:id", validateId, removeContactCb);
export default deleteRouter;