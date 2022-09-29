const { ContactModel } = require("../../models/contact");

const getAll = async (userId, skip, limit) => {
  const data = await ContactModel.find({ owner: userId }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");
  return data;
};
module.exports = getAll;
