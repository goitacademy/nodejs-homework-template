const { Contact } = require("../../models");

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, "", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json(result);
  }
};

module.exports = getListContacts;
