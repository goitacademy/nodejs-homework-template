import { HttpError } from "../../helpers/index.js";
import { HTTP_STATUS } from "../../constants/index.js";
import { Contact } from "../../models/index.js";

export const updateStatusById = async ({ body, params }, res) => {
  const { id } = params;

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) throw HttpError(HTTP_STATUS.notFound);

  res.json(result);
};
