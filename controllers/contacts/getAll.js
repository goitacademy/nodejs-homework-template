const Contact = require("../../models/Contacts");

async function getAll(req, res) {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  if (!favorite) {
    const result = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");

    res.json(result);
  }
  const result = await Contact.find(
    { owner: _id, favorite: favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");

  res.json(result);
}

module.exports = getAll;
