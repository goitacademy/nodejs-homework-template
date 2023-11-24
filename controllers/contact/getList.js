// controllers/contact/getList.js
import Contact from "../../models/Contact.js";

export const getList = async (req, res) => {
  const data = await Contact.find();
  res.json(data);
};
