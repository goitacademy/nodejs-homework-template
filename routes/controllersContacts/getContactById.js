import { Router } from "express";
import { getContactById } from "../../controllers";
import { validateId } from "../../middleware";

const routerGetContactById = new Router();
routerGetContactById.get("/:id", validateId, getContactById);
export default routerGetContactById;
