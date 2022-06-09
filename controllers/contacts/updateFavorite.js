const { schemaJoiFavorite, Contact } = require("../../models/contact");

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { id } = req.user;

    if (favorite === undefined || favorite === null) {
      return res.status(400).json({
        message: "missing field favorite",
      });
    }
    const { error } = schemaJoiFavorite.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: id },
      { favorite },
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

module.exports = updateFavorite;
