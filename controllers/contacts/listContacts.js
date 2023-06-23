const { Contact } = require("../../models/contact/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const query = req.query;

  let result = null;

  if (query.favorite === "true") {
    result = await Contact.find(
      { owner, favorite: true },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    );

    res.json(result);
  }

  result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

module.exports = {
  listContacts,
};
