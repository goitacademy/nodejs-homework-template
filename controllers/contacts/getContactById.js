import { Router } from "express";
import { validateId } from "../../middlewares/contacts/validation";
import operations from "../../model/operations";
const getByIdRouter = new Router();
getByIdRouter.get("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await operations.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});
export default getByIdRouter;
