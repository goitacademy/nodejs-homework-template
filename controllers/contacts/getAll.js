const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers/");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, ...filter } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, ...filter },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner");
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getAll;
