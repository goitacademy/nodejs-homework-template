import { Router } from "express";
import { getContactByIdCb } from "../../controllers/contacts";
import { validateId } from "../../middlewares/contacts/validation";
import guard from "../../middlewares/guard";

const getByIdRouter = new Router();
getByIdRouter.get("/:id", [guard, validateId], getContactByIdCb);
export default getByIdRouter;