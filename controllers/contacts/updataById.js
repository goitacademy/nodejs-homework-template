const { schemaJoi, Contact } = require("../../models/contact");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { id } = req.user;
    const { error } = schemaJoi.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: id },
      req.body,
      { new: true }
    );
    if (!contact)
      return res.status(404).json({
        message: `Not found`,
      });
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
