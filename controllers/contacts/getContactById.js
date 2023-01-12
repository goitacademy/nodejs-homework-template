const contacts = require("../../models/contacts");
const HttpError = require("../../helpers");
// const addSchema = require("../../schemas/contacts");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found")
    };

    res.json(result);
  } catch (error) {
    next(error);
  }
}
module.exports = getContactById;