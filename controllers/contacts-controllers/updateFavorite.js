import Contact from "../../models/contact.js";

import HttpError from "../../helpers/HttpError.js";

import { contactsUpdateFavoriteSchema } from "../../schemas/contacts-schemas.js";

const updateFavorite = async (request, response, next) => {
  try {
    const { error } = contactsUpdateFavoriteSchema.validate(request.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = request.params;
    const result = await Contact.findByIdAndUpdate(contactId, request.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    response.json(result);
  } catch (error) {
    next(error);
  }
};

export default updateFavorite;
