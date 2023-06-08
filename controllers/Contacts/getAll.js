const { cntModel } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(owner);
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await cntModel
    .find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    })
    .populate("owner", "email");
  console.log(contacts);
  res.json({
    status: 200,
    skip: page,
    data: {
      contacts,
    },
  });
};

module.exports = getAllContacts;
