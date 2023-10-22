const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  let result;

  if (favorite) {
    result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    }).populate("owner", "email subscription");
  } else {
    result = await Contact.find({ owner }, "", { skip, limit }).populate(
      "owner",
      "email subscription"
    );
  }

  res.json(result);
};

module.exports = getAllContacts;
