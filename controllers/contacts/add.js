import { HTTP_STATUS } from "../../constants/index.js";
import { HttpError } from "../../helpers/httpError.js";
import { Contact } from "../../models/index.js";

const ERR_ALREADY_EXISTS =
  "A contact with same phone or email is already in your list";

export const add = async ({ body, user }, res) => {
  const owner = user._id;
  const { email, phone } = body;
  const found = await Contact.findOne({
    $and: [{ owner }],
    $or: [{ email }, { phone }],
  });

  if (found) throw HttpError(HTTP_STATUS.conflict, ERR_ALREADY_EXISTS);

  const result = await Contact.create({ ...body, owner });
  res.status(HTTP_STATUS.created).json(result);
};
