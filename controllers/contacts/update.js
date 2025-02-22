/** @format */

const { Contact } = require("../../models/contact");
const { schema } = require("../../models/contact");
const RequestError = require("../../helpers/requestError");

const update = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      throw RequestError(404, `Not found contact ${contactId}`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
