import { Router } from "express";
import { getContactById } from "../../controllers";
import { validateId } from "../../middleware";
import guard from "../../middleware/guard";

const routerGetContactById = new Router();
routerGetContactById.get("/:id", [guard, validateId], getContactById);
export default routerGetContactById;
