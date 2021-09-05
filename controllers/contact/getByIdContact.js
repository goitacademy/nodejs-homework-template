const { Contacts } = require("../../repositories");

const getByIdContact = async (req, res, _next) => {
  const { contactId } = req.params;
  const result = await Contacts.getContactById(contactId);

  if (!result) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
  return res.json({ result });
};
module.exports = getByIdContact;
