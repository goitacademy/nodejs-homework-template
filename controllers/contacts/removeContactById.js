const { Contact } = require("../../models");

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: userId }); //    ByIdAndRemove(contactId);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContactById;
