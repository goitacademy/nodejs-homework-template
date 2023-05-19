const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "Success",
    code: 200,
    message: "Status updated",
    data: {
      contact,
    },
  });
};

module.exports = updateContactStatus;
