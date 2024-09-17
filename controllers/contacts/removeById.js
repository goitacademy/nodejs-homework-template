const { Contact } = require("../../models/contact");

const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  console.log(`🚀 ~ removeById ~ result:`, result);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeById;
