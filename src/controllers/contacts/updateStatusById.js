const { updateStatusContact } = require("../../models/contacts");

const updateStatus = async (req, res, next) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  if (favorite === true || favorite === false) {
    const data = await updateStatusContact(contactId, req.body);
    if (!data) {
      return res.status(400).json({ status: 400, message: "Not found" });
    }
    return res
      .status(200)
      .json({ data, status: 200, message: "operation successful" });
  }

  return res
    .status(400)
    .json({ status: 400, message: "missing field favorite" });
};
module.exports = {
  updateStatus,
};
