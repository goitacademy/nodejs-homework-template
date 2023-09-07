import { HttpError } from "../helpers/index.js";

const checkContactAndAccess = (contact, currentUserId) => {
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found!`);
  }
  if (contact.owner.toString() !== currentUserId.toString()) {
    HttpError(403, `Access denied!`);
  }
};

export default checkContactAndAccess;
