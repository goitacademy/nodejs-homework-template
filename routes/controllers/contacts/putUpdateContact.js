import express from "express";
import model from "../../../model/contacts/index";
import { validateUpdate } from "../../../midllewares/validation/validation";

const router = express.Router();

router.put("/:id", validateUpdate, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.updateContact(id, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

export default router;
