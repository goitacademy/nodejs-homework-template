const { updateContact } = require("../../models/contacts");

const update = async (req, res, next) => {
  try {
    const requestId = req.params.contactId;

    const contact = await updateContact(requestId, req.body);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json({ data: { contact } });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = update;
