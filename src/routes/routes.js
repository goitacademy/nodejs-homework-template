import { Router } from "express";
import userCtrl from "../controllers/controllers.js";
import contactsCtrl from "../controllers/controllers.js";

const route = Router();

route.get("/", contactsCtrl.listContacts);
route.get("/:id", contactsCtrl.getById);
route.post("/", contactsCtrl.addContact);
route.delete("/:id", contactsCtrl.removeContact);
route.put("/:id", contactsCtrl.updateContact);

export default route;
