const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filterValue = favorite ? { owner: _id, favorite } : { owner: _id };

  const result = await Contact.find(filterValue, "", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
