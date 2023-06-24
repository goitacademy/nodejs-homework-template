const { Contact } = require("../../models/contact/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  let result = null;

  if (favorite === "true") {
    result = await Contact.find(
      { owner, favorite: true },
      "-createdAt -updatedAt"
    );

    return res.json(result);
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
