import Contact from "../../models/Contact.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const filter = { owner };
  if (favorite) {
    filter.favorite = favorite;
  }
  const skip = (page - 1) * limit;
  const result = await Contact.find(filter, "", { skip, limit });
  res.json(result);
};

export default ctrlWrapper(getAllContacts);
