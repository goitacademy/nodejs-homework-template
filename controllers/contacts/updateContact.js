const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const owner = req.user._id;
  const updateContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!updateContact) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: { updateContact },
  });
};

module.exports = updateContact;
