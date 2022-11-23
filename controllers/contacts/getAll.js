const { contactSchema } = require("../../models");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = "" } = req.query;
  const skip = (page - 1) * limit;
  const result = await contactSchema.Contact.find(
    { owner: owner, ...(favorite ? { favorite: favorite } : "") },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit)
    }
  );
  res.json(result);
};

module.exports = getAll;
