const User = require('../models/user');
// const { HttpError } = require('../helpers');
// const ctrlWrapper = require('../middlewares/ctrlWrapper');

const register = async (req, res, next) => {
  try {
     const { email } = req.body;
      const user = await User.findOne({ email });
       if (user) {
  
        throw res.status(409).json({message: "Email in use"})
       }
    const newUser = await User.create(req.body);
    res.status(201).json({ email: newUser.email, name: newUser.name });
  } catch (error) {
    next(error);
  }

};
module.exports = register;
