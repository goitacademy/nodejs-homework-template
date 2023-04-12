const { NotFound } = require("http-errors");

const contact = require("../../models/contact");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contact.findById(contactId);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
