import { Router } from "express";
import { getContactById } from "../../model/contacts";

const router = new Router();

router.get("/:id", async (req, res, _next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

export default router;