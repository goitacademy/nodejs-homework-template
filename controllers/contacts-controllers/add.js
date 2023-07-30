import Contact from "../../models/contact.js";

import { HttpError } from "../../helpers/index.js";

import { contactsAddSchema } from "../../schemas/contacts-schemas.js";

const add = async (request, response, next) => {
  try {
    const { error } = contactsAddSchema.validate(request.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { _id: owner } = request.user;
    const result = await Contact.create({ ...request.body, owner });
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default add;
