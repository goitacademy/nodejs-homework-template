const { Contact } = require("../../models/");

async function listContacts(req, res) {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = favorite ?
    await Contact.find({ owner: _id, favorite: true }, "", { skip, limit: Number(limit) }).populate("owner", "_id email subscription")
    : await Contact.find({ owner: _id }, "", { skip, limit: Number(limit) }).populate("owner", "_id email subscription");
  res.json({
    status: "Success",
    code: 200,
    data: {
      result: contacts
    }
  });
};

module.exports = listContacts;