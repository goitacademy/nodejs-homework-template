import Contact from "../../models/contact-model.js";
import { ctrlWrapper } from "../../decorators/index.js";

const add = async (req, res) => {
  const {_id: owner} = req.user;

  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

export default ctrlWrapper(add);