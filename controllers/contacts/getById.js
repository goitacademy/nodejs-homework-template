const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contactById = await Contact.findOne({ _id: contactId, owner: _id });
  if (!contactById) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    data: {
      contactById,
    },
  });
};

module.exports = getById;
