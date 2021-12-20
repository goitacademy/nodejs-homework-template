import { Router } from "express";
import operations from "../../../model/operations";
const createRouter = new Router();
import { validateAdd } from "../../../middlewares/contacts/validation";

createRouter.post("/", validateAdd, async (req, res, next) => {
  const createContact = await operations.addContact(req.body);
  res.status(201).json(createContact);
});
export default createRouter;
