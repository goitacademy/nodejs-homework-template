const Contact = require("../../models/contacts");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  if (req.query.favorite) {
    const data = await Contact.find({ owner }).exec();
    const result = data.filter((contact) => contact.favorite);
    return res.json(result);
  }

  const result = await Contact.find({ owner }, "", { skip, limit }).exec();
  res.json(result);
};

module.exports = getAll;
