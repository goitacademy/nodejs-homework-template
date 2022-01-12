import { Router } from "express";
import { updateContact } from "../../model/contacts";
import { validateUpdate } from "../../middlewares/validation/validation";

const router = new Router();

router.put("/:id", validateUpdate, async (req, res, _next) => {
  const { id } = req.params;
  const updContact = await updateContact(id, req.body);
  if (updContact) {
    return res.status(200).json(updContact);
  }
  res.status(404).json({ message: "Not found" });
});

export default router;