const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!updatedStatusContact) {
    throw new NotFound("Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      updatedStatusContact,
    },
  });
};

module.exports = updateStatusContact;
