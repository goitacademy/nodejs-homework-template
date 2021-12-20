import express from "express";
import { removeContact } from "../../../model/index";

import { validationId } from "../../../midllewares/index";

const deleteRouter = express.Router();

deleteRouter.delete("/:id", validationId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (contact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

export default deleteRouter;
