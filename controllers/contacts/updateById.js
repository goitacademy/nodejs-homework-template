const contactsOperations = require("../../models/contacts");
const RequestError = require("../../helpers/requestError");
const conctactShchema = require("../../shchemas/contacts");

const updateById = async (req, res, next) => {
  try {
    const { error } = conctactShchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const contact = await contactsOperations.updateById(contactId, req.body);
    if (!contact) {
      throw RequestError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
