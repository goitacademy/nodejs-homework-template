const { updateStatusContact } = require("../../models/contacts");

const updateStatusById = async (req, res, next) => {
  console.log(req.user);
  const ownerId = req.user.id;
  const { favorite } = req.body;
  const { contactId } = req.params;
  if (favorite === true || favorite === false) {
    const data = await updateStatusContact(contactId, req.body, ownerId);
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
module.exports = updateStatusById;
