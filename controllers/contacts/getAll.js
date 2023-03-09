const Contact = require("../../models/contact");

async function getAll(req, res, next) {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const contacts = await Contact.find({ owner: _id, favorite })
      .populate("owner", "email subscription")
      .skip(parseInt(skip))
      .limit(limit);
    return res.json(contacts);
  }

  const contacts = await Contact.find({ owner: _id })
    .populate("owner", "email subscription")
    .skip(parseInt(skip))
    .limit(limit);

  res.json(contacts);
}
module.exports = getAll;
