/** @format */

const RequestError = require("../../helpers/requestError");
const {Contact}  = require("../../models/contact");

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw RequestError(404, `Not found contact ${contactId}`);
    }
    res.json({
      message: "delete success",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = remove;
