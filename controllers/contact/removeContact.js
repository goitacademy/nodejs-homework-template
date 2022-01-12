import { Router } from "express";
import { removeContact } from "../../model/contacts";

const router = new Router();

router.delete("/:id", async (req, res, _next) => {
  const { id } = req.params;
  const delContact = await removeContact(id);
  if (delContact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

export default router;