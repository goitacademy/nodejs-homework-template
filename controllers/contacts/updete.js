const { Contact } = require("../../models/contacts");

const update = async (req, res, next) => {
  try {
    const requestId = req.params.contactId;

    const contact = await Contact.findByIdAndUpdate(requestId, req.body, {
      new: true,
    });

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
