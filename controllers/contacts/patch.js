import createError from "http-errors";
import models from "../../models/index.js";
import mongoose from "mongoose";

const { contactModel } = models;
const { Contact } = contactModel;

const { NotFound } = createError;

export const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Status updated",
    data: {
      result,
    },
  });
};
