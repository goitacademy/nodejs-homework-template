const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const getByCondition = { owner: _id };
  if (favorite === "true") {
    getByCondition.favorite = true;
  }
  if (favorite === "false") {
    getByCondition.favorite = false;
  }
  const contacts = await Contact.find(getByCondition, "", {
    skip,
    limit,
  });
  res.json({
    status: "success",
    code: "200",
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
