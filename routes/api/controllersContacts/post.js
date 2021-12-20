import express from "express";
import { addContact } from "../../../model/index";

import { validationCreate } from "../../../midllewares/index";

const postRouter = express.Router();

postRouter.post("/", validationCreate, async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

export default postRouter;
