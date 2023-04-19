const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite = "" } = req.query;
  const skip = (page - 1) * limit;
  if (favorite === "") {
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    })
      .populate("owner", "name email")
      .find({ favorite: { $eq: favorite } });
    res.json(result);
  }
};

module.exports = getAll;
