import mongoose from "mongoose";
import HttpError from "./HttpError.js";

export const verifyContactExist = async (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(HttpError(400, "Invalid ID"));
  }
  try {
    const ContactModel = mongoose.model("contact");
    const contactExist = await ContactModel.findById(contactId);
    if (!contactExist) {
      return next(HttpError(404, "Contact not found"));
    }
    next();
  } catch (error) {
    next(error);
  }
};
