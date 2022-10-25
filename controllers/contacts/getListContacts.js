const { Contact } = require("../../models");
const getListContacts = async (req, res) => {
  const contacts = await Contact.find({ owner: req.user._id });
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
};

module.exports = getListContacts;
