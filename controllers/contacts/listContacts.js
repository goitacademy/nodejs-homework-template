const { Contact } = require("../../models");
const { BadRequest } = require("http-errors");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const { favorite = null } = req.query;

  const searchParameters = {
    owner: _id,
  };

  if (favorite !== null) {
    const enumFavorite = new Set();
    enumFavorite.add("true");
    enumFavorite.add("false");

    if (enumFavorite.has(favorite)) {
      searchParameters.favorite = JSON.parse(favorite);
    } else {
      throw BadRequest();
    }
  }

  const skip = (page - 1) * limit;

  const contacts = await Contact.find(searchParameters, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");
  res.json(contacts);
};

module.exports = listContacts;
