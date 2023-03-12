const { getContactById } = require("../../models/contacts");

exports.getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        msg: "Not Found!",
      });
    }
    res.status("200").json(contact);
  } catch (error) {
    // res.status(500).json({ error: error.message });
    next(error);
  }
};
