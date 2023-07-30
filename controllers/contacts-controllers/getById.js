import Contact from "../../models/contact.js";

import HttpError from "../../helpers/HttpError.js";

const getById = async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    response.json(result);
  } catch (error) {
    next(error);
  }
};

export default getById;
