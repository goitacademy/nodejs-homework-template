const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');

const removeById = async (requirement, response, next) => {
  try {
    const contactId = requirement.params.contactId;
    const findContactById = await Contact.findByIdAndRemove(contactId);

    if (!findContactById) {
      throw RequestError(404, "Not found contact");
    }

    response.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = removeById;