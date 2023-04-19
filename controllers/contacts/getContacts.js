const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 2, favorite = false } = req.query;

  const skip = (page - 1) * limit;

  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "name email _id");
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "name email _id");
    res.json(result);
  }
};

module.exports = { getContacts: ctrlWrapper(getContacts) };
