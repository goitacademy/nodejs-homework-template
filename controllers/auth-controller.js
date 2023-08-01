import User from "../models/user.js";
import HttpError from "../helpers/httpError.js";
import  ctrlWrapper  from '../decorators/cntrWrapper.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const { JWT_SECRET } = process.env;
const signup = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (user) {
      throw HttpError(409, 'Email in use');
   }
   const hashPassword = await bcrypt.hash(password, 10);

   const newUser = await User.create({ ...req.body, password: hashPassword });

   res.status(201).json({
      email: newUser.email,
      subscription: "starter"
   });
};

const signin = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (!user) {
      throw HttpError(401, 'Email or password invalid');
   }
   const passwordCompare = await bcrypt.compare(password, user.password);
   if (!passwordCompare) {
      throw HttpError(401, 'Email or password invalid');
   }

   const payload = {
      id: user._id,
   }

   const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '23h'});
   await User.findByIdAndUpdate(user._id, { token });

   res.json({
      token,
   })
};

const getCurrent = (req, res) => {
   const { email, subscription } = req.user;
   res.json({
      email,
      subscription,
   })
};

const signout = async (req, res) => {
   const { _id } = req.user;
   await User.findByIdAndUpdate(_id, { token: '' });

   res.status(204).json({
      message: 'No Content',
   });
};

const updateSubscription = async (req, res) => {
      const { _id } = req.user;
      const result = await User.findByIdAndUpdate(_id, { ...req.body }, {new: true});
      if (!result) {
         throw HttpError(404, `Contact with id=${_id} not found`);
      }
   res.json(result);
}; 

export default {
   signup: ctrlWrapper(signup),
   signin: ctrlWrapper(signin),
   getCurrent: ctrlWrapper(getCurrent),
   signout: ctrlWrapper(signout),
   updateSubscription: ctrlWrapper(updateSubscription),

}