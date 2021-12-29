import { Router } from "express";
import { getContactByIdCb } from "../../controllers/contacts";
import guard from "../../middlewares/users/guard";
import { validateId } from "../../middlewares/contacts/validation";
const getByIdRouter = new Router();
getByIdRouter.get("/:id", [guard, validateId], getContactByIdCb);
export default getByIdRouter;
