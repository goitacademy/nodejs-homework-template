const { Contacts } = require("../../repositories");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndUpdate({ _id: contactId }, req.body);
  if (result) {
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { result } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not found" });
};

module.exports = updateContact;
