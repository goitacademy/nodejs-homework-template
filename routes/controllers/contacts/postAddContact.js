import express from "express";
import model from "../../../model/contacts/index";
import { validateCreate } from "../../../midllewares/validation/validation";

const router = express.Router();

router.post("/", validateCreate, async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json(newContact);
});

export default router;
