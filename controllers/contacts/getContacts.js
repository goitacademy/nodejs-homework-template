const { Contact } = require("../../models");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  let findOptions = {};

  if (favorite) {
    if (favorite === "true" || favorite === "1") {
      findOptions = {
        favorite: true,
      };
    }
    if (favorite === "false" || favorite === "0") {
      findOptions = {
        favorite: false,
      };
    }
  }
  const contacts = await Contact.find({ owner: _id, ...findOptions }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getContacts;
