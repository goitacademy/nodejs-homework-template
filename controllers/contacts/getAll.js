const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;

  if (favorite) {
    const contacts = await Contact.find(
      { owner: _id, favorite: favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "_id email subscription");
    return res.status(200).json(contacts);
  }
  const contacts = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");
  res.status(200).json(contacts);
};

module.exports = getAll;
// if(favorite){ return favorite: favorite}
