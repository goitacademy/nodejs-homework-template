import { Router } from "express";
import { getContactByIdCb } from "../../controllers/contacts";
import { validateId } from "../../middlewares/contacts/validation";
import guard from "../../middlewares/guard";
import wrapperError from "../../middlewares/error-handler";

const getByIdRouter = new Router();
getByIdRouter.get("/:id", [guard, validateId], wrapperError(getContactByIdCb));
export default getByIdRouter;