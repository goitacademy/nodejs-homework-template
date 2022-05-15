const { Contact } = require("../../models/contact");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { id } = req.user;
    const contact = await Contact.findOne(
      { _id: contactId, owner: id },
      " name phone email favorite"
    ).populate("owner", "email");
    if (!contact) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
