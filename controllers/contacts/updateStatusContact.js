const Contact = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  if (req.body.favorite === undefined) {
    return res
      .status(400)
      .json({ status: "error", code: 400, message: "missing field favorite" });
  }

  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    { favorite },
    { new: true }
  );

  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }

  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
};

module.exports = updateStatusContact;
