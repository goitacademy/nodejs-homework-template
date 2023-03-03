const Contact = require("../../models/contact");

async function getAll(req, res, next) {
  const { _id: owner } = req.user;
  const { page = 1, limit = 3, favorite } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner, favorite })
    .populate("owner", "email subscription")
    .skip(parseInt(skip))
    .limit(limit);
  res.json(contacts);
}
module.exports = getAll;
