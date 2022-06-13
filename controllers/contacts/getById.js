import operations from "../../models/contacts/index.js";
import createError from "http-errors";

const { NotFound } = createError;

export const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await operations.getContactById(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact found",
    data: {
      result,
    },
  });
};
