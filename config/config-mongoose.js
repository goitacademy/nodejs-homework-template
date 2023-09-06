import mongoose from 'mongoose';

export const checkContactId = async (req, res, next) => {
  const { id: contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({
      status: 'error',
      code: 40,
      message: 'Contact has not valid id',
      data: 'Contact has not valid id',
    });
  }
  next();
};
