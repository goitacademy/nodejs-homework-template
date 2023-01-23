const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");
const bcrypt = require("bcryptjs")



const register = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
      if (user) {
          throw HttpError(409, "Email in use");
          
    }
     const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = await User.create({ ...req.body, password: hashPassword });
    
      res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
 }
module.exports = register