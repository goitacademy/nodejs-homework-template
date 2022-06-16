import createError from "http-errors";
import models from "../../models/index.js";
import mongoose from "mongoose";

const { contactModel } = models;
const { Contact } = contactModel;

const { NotFound } = createError;

export const removeById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  const result = await Contact.findOneAndRemove({
    owner: _id,
    _id: contactId,
  });

  if (!result) {
    throw new NotFound(
      `Contact with id=${contactId} not found in your collection`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: {
      result,
    },
  });
};
