const { Contact } = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updateStatus = await Contact.findOneAndUpdate(contactId, req.body, {
    new: true,
  });
  
  if (!updateStatus) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
  }
  res.json(updateStatus);
};

module.exports = updateStatusContact;
