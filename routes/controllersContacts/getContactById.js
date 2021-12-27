import { Router } from "express";
import { getContactById } from "../../controllers/contacts";
// import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
// import { HttpCode } from "../../lib/constants";

const routerGetContactById = new Router();
routerGetContactById.get("/:id", middleware.validateId, getContactById);
export default routerGetContactById;
