const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await await Contact.find(
    { owner },
    { skip, limit: Number(limit) }
  ).populate("owner", "name email");
  res.json(result);
};
module.exports = getAll;
