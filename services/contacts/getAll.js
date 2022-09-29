const { ContactModel } = require("../../models/contact");

const getAll = async (userId, skip, limit) => {
  const data = await ContactModel.find({ owner: userId }, "", {
    skip,
    limit: Number(limit),
  });
  return data;
};
module.exports = getAll;
