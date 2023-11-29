
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const User = require('../models/User');

const {HttpError}= require('../helpers/HttpError');





const register = async(req, res, next) => {
  const {email, password } = req.body;
  const user = await User.findOne({email});
  if (user) {
    return next(HttpError(409, "Email in use"));
  }
  const hashedPassword=await bcrypt.hash(password, 10)


  const newUser = await User.create({...req.body, password: hashedPassword});
  res.status(201).json({
   user:{
      email: newUser.email,
      subscription: newUser.subscription,}
    
  });



    if (!email || !password) {
      return next(HttpError(400, 'Validation error: Email and password are required.'));
    }

  
};


const login = async (req, res, next) => {
const {email, password} = req.body;
const existingUser = await User.findOne({ email });
if (!existingUser) {
  return next(HttpError(401, "Email or password is wrong"));
}


const passwordCompare= await bcrypt.compare(password, existingUser.password);
if(!passwordCompare){
  return next(HttpError(401, "Email or password is wrong"));
}

const payload={
  id: existingUser._id,
}


const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "23h" });
existingUser.token = token;
await existingUser.save();


res.json({
  token,
  user: {
    email: existingUser.email,
    subscription: existingUser.subscription,
  }
})

}

const current= async (req, res, next) => {
const {email, subscription}=req.user;


if (!email || !subscription) {
  return next(HttpError(401, 'Not authorized'));
}
res.status(200).json({
  
    email,
    subscription
  
  
});



}

const logout= async (req, res, next) => {
const{_id}=req.user;
const user = await User.findByIdAndUpdate(_id, {token:""})
  
  if (!user) {
    return next(HttpError(401, "Not authorized"));
  }

  res.status(204).json({
    message: "No Content"
  });

}


const updateSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const subscriptions = ['starter', 'pro', 'business'];

  if (!subscriptions.includes(subscription)) {
    return next(HttpError(400, 'Invalid subscription'));
  }

  req.user.subscription = subscription;
  await req.user.save();

  res.status(200).json({
      email: req.user.email,
      subscription: req.user.subscription
  
  });
}



module.exports = {
  register,
  login,
  current,
  logout,
  updateSubscription
};

