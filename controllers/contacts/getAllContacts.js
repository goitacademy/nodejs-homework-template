const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  let result;

  if (favorite === "false" || favorite === "true") {
    result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    });
  } else {
    result = await Contact.find({ owner }, "", {
      skip,
      limit,
    });
  }

  res.json(result);
};

module.exports = getAllContacts;