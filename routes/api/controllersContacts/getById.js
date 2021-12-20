import express from "express";
import { getContactById } from "../../../model/index";
import { validationId } from "../../../midllewares/index";

const getByIdRouter = express.Router();

getByIdRouter.get("/:id", validationId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});
export default getByIdRouter;
