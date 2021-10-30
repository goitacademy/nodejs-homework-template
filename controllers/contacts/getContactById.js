const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const owner = req.user._id;
  const contact = await Contact.findOne({
    _id: contactId,
    owner,
  });
  if (!contact) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

module.exports = getContactById;
