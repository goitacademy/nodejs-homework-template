import mongoose from 'mongoose';

export const checkContact = async (req, res, next) => {
  const { id: contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({
      status: 'error',
      code: 40,
      message: 'Contact is not a valid contact',
      data: 'Contact is not a valid contact',
    });
  }
  next();
};
