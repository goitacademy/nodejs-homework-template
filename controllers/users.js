
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { findById, findByEmail,  updateToken, updateUser } = require('../model/users');
const User = require('../schemas/userSchema');
const {Subscription} = require('../helpers/constans')
const {HttpCode} = require('../helpers/constans')

const SECRET_KEY = process.env.SECRET_KEY



  
  const registration = async (req, res, next) => {
    const {  username, email,password } = req.body
    const user = await findByEmail( email )
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email is already in use',
        data: 'Conflict',
      })
    }
    try {
    const newUser = new User({ username, email })
    newUser.setPassword(password)
    await newUser.save()
      res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: {
           email: newUser.email,
           subscription: newUser.subscription,
           //newUser,
          message: 'Registration successful'
        },
      })
    } catch (error) {
      next(error)
    }
  }

  const login = async (req, res, next) => {
      try {
    const { email, password } = req.body
    const user = await findByEmail(email)
    if (!user || !(await user.validPassword(password))) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Incorrect login or password',
        data: 'Bad request',
      })
    }
  
    else { 
    const id = user.id
    const payload = {id}
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    await updateToken(id, token);
    res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
      },
    })
  }}
  catch(e)
  {next(e)}
  }
  
const logout = async (req, res, next) => {
   const id = req.user.id
   const user = await updateToken(id, null)
 return res.status(HttpCode.NO_CONTENT).json({ 
    
 })}


const current = async (req, res, next) => {
    try {
    const { id, email, subscription } = req.user;
    console.log(id);
    const user = await findById(id);
    if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
    status: 'error',
    code: HttpCode.UNAUTHORIZED,
    message: 'Not authorized',
    });
    }
      
return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
        email,
        subscription,
        },
    });
    } catch (err) {
          next(err);
    }
}

const updateSub =  async (req, res, next) => {
  try {
    const {subscription} = req.body;
    const subOption = Object.values(Subscription)
    console.log(subOption)
    if (!subOption.includes(subscription)) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message:`Invalid subscription. Choose one of folowing:${subOption}`
    })}
    const user  = await updateUser( req.user.id, subscription);
       return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message:`Subscription changed to ${subscription}`,
        data: {
          email: user.email,
          subscription: subscription,
        },
    })
 } catch (error) {
   next(error)
 }
}

module.exports = {
 login,
 registration,
 logout,
 current,
 updateSub
}