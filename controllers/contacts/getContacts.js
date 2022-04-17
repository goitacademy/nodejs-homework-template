const { Contact } = require('../../models');

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact
    .find({ owner: _id }, "", { skip, limit: Number(limit) })
    .populate("owner", "_id email subscription");
  res.json({status: "success ", code: 200, payload : {contacts}})
}

module.exports = getContacts;
