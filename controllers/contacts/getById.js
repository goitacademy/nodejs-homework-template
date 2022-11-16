const { Contact } = require("../../models/contact");

const { requestError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneContact = await Contact.findById(id);
    if (!oneContact) {
      throw requestError(404, "Not found");
    }

    res.json(oneContact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
