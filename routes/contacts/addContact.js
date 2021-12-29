import { Router } from "express";
import { addContactCb } from "../../controllers/contacts";
import { validateAdd } from "../../middlewares/contacts/validation";
const createRouter = new Router();

createRouter.post("/", validateAdd, addContactCb);
export default createRouter;