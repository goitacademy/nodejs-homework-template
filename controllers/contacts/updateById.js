const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');

const updateById = async (requirement, response, next) => {
  try {
    const contactId = requirement.params.contactId;
    const body = requirement.body;

    if (body === null) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }
    
    response.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
}

module.exports = updateById;