const { cntModel } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const contacts = await cntModel
    .find({ owner }, "-createdAt -updatedAt", { skip: page, limit })
    .populate("owner", "name email");
  res.json({
    status: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getAllContacts;
