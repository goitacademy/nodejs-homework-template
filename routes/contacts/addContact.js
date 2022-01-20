import { Router } from "express";
import { addContactCb } from "../../controllers/contacts";
import { validateAdd } from "../../middlewares/contacts/validation";
import guard from "../../middlewares/guard";
import wrapperError from "../../middlewares/error-handler";

const createRouter = new Router();

createRouter.post("/", [guard, validateAdd], wrapperError(addContactCb));
export default createRouter;