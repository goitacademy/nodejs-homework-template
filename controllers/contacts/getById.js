const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = getById;