const { Contact } = require("../../models/contact");

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    res.json(result);
  }
};

module.exports = getListContacts;
