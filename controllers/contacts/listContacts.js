const Contact = require("../../models/contact");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, favorite: true },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  );
  // const result = await Contact.find(
  //   { owner },
  //   "-createdAt -updatedAt"
  // ).populate("owner", "name email");
  res.json(result);
};

module.exports = listContacts;
