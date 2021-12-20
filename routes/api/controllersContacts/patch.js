import express from "express";
import { updateContact } from "../../../model/index";

import { validationUpdate, validationId } from "../../../midllewares/index";

const patchRouter = express.Router();

patchRouter.patch(
  "/:id",
  validationId,
  validationUpdate,
  async (req, res, next) => {
    const { id } = req.params;
    const contact = await updateContact(id, req.body);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  }
);

export default patchRouter;
