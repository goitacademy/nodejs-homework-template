import User from '../models/user.js';
import { ctrlWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const newUser = await User.create(req.body);
  console.log(newUser);
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

export default {
  register: ctrlWrapper(register),
  //   getContactById: ctrlWrapper(getContactById),
  //   addNewContact: ctrlWrapper(addNewContact),
  //   deleteContactById: ctrlWrapper(deleteContactById),
  //   updateContactById: ctrlWrapper(updateContactById),
  //   updateStatusContact: ctrlWrapper(updateStatusContact),
};
