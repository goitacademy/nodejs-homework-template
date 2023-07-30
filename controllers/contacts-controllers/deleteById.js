import Contact from "../../models/contact.js";

import HttpError from "../../helpers/HttpError.js";

const deleteById = async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    response.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteById;
