const { Contact } = require("../../models");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const { name = null, email = null, phone = null, favorite = null } = req.body;
  if (!name || !email || !phone || favorite === null) {
    const error = new Error("missing fields");
    error.status = 400;
    throw error;
  }
  const updContact = await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, req.body, {
    new: true,
  }); // ByIdAndUpdate(contactId, req.body, { new: true });
  if (!updContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(updContact);
};

module.exports = updateContactById;
