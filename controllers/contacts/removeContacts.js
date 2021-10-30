const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const owner = req.user._id;
  const deleteContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner,
  });
  if (!deleteContact) {
    throw new NotFound("Not found");
  }
  res.json({
    message: "contact deleted",
    code: 200,
    data: { deleteContact },
  });
};

module.exports = removeContact;
