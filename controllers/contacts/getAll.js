const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const findParams = favorite ? { owner: _id, favorite } : { owner: _id };
  const allContact = await Contact.find(findParams, "-createdAt -updatedAt", {
    skip,
    limit: +limit,
  }).populate("owner", "_id name email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: allContact,
    },
  });
};

module.exports = getAll;
