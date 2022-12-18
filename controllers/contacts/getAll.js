const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const { favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit: +limit,
  });
  if (favorite) {
    const sortedResult = result.sort((x, y) => {
      return x.favorite === y.favorite ? 0 : x.favorite ? -1 : 1;
    });
    res.json(sortedResult);
  } else {
    res.json(result);
  }
};

module.exports = getAll;
