import { Router } from "express";
import { getContactByIdCb } from "../../controllers/contacts";
import { validateId } from "../../middlewares/contacts/validation";
import guard from "../../../midllewares/guard";

const getByIdRouter = new Router();
getByIdRouter.get("/:id", [guard, validateId], getContactByIdCb);
export default getByIdRouter;