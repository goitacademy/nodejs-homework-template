import { Router } from "express";
import { addContact } from "../../model/contacts";
import { validateCreate } from "../../middlewares/validation/validation";

const router = new Router();

router.post("/", validateCreate, async (req, res, _next) => {
  const newContact = await addContact(req.body);
  return res.status(201).json(newContact);
});

export default router;