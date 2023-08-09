const { Contact } = require("../../models/");

const listContacts = async (req, res) => {
  const { favorite } = req.query;

  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  let result = null;

  if (favorite) {
    result = await Contact.find({ owner, favorite }, "-createAt -updateAt", {
      skip,
      limit,
    }).populate("owner", "name email");
  } else {
    result = await Contact.find({ owner }, "-createAt -updateAt", {
      skip,
      limit,
    }).populate("owner", "name email");
  }

  res.json(result);
};

module.exports = listContacts;
