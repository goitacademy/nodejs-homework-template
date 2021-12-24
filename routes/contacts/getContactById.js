import { Router } from "express";
import { getContactByIdCb } from "../../controllers/contacts";
import { validateId } from "../../middlewares/contacts/validation";
const getByIdRouter = new Router();
getByIdRouter.get("/:id", validateId, getContactByIdCb);
export default getByIdRouter;