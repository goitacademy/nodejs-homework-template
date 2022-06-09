const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = true } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    { owner: _id, favorite: favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  )
    .populate("owner", "email")
    .exec();
  res.json(contacts);
};
module.exports = getAll;
