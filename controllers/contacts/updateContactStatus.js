const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const { favorite } = req.body;

  const contact = await Contact.findByIdAndUpdate(
    {
      owner: _id,
      _id: contactId,
    },
    { favorite },
    { new: true }
  ).populate("owner", "_id email subscription");
  
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
