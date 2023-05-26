const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const contact = await Contact.findOne({
    owner: _id,
    _id: contactId,
  }).populate("owner", "_id email subscription");

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "Success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = getContactById;
