/** @format */

const RequestError = require("../../helpers/requestError");
const {Contact} = require("../../models/contact");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ _id: contactId, owner });
    if (!result) {
      throw RequestError(404, `Not found contact`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
