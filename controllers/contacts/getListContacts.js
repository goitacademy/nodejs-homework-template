const { Contact } = require("../../models");
const getListContacts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: req.user._id }, "", {
    skip,
    limit: +limit,
  });
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
};

module.exports = getListContacts;
