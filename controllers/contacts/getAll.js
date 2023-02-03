// const contacts = require("../../models/contacts.json");
const { Contact } = require("../../models");

// const { Contact } = require("../../models/contacts");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  res.status(200).json({
    ststus: "succses",
    code: 200,
    data,
  });
};

module.exports = listContacts;
