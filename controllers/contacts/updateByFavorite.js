const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');

const updateByFavorite = async (requirement, response, next) => {
  try {
    const contactId = requirement.params.contactId;
    const body = requirement.body;

    if (body === null) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });

    if (!contactUpdate) {
      throw RequestError(404, "Not found update");
    }

    response.json(contactUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports = updateByFavorite;