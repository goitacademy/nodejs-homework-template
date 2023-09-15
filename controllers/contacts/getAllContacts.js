import Contact from "../../models/Contact.js";
import {ctrlWrapper} from "../../decorators/index.js";

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  // console.log(result);
  res.json(result);
};

export default { getAllContacts: ctrlWrapper(getAllContacts) };
