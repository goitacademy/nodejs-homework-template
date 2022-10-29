const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const { userId } = req.user;
  let { page = 1, limit = 20, favorite = false } = req.query;
  limit = limit > 20 ? 20 : limit;
  const toSkip = page * limit - page;

  const result = await Contact.find({
    owner: userId,
    favorite,
  })
    .skip(toSkip)
    .limit(limit);

  res.json(result);
};

module.exports = getAll;
