const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');

const getById = async (requirement, response, next) => {
  try {
    const contactId = requirement.params.contactId;
    const contactById = await Contact.findById(contactId);

    if (!contactById) {
      throw RequestError(404, "Not found contact");
    }

    response.json(contactById);
  } catch (error) {
    next(error);
  }
}

module.exports = getById;