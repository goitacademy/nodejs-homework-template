const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Users = require('../../schemas/users')
const {addUser, findUser,findUserById,currentUser} = require('../../models/users')
const passportJwt = require('../../config/passportJwt')
const passport = require('passport')


require('dotenv').config()
const secret = process.env.JWT_SECRET


const createUser = async (req, res) => {
    const {email, password } = req.body;
    console.log(email, password)
    if (!email || !password) {
        res.json({
            status: "error",
            code:  400,
            data:{
                message: "Bad Request"
            }
        });
        return;
    } 
    const userCheck = await Users.findOne({ email })
  if (userCheck) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    }) 
  }
   const user = await addUser(email, password);
  console.log(user) 
  return res.status(201).json ({
    status: 'success',
    code: 201,
    message: 'Created',
    data:'Created'
})   
};


const loginUser = async (req, res) => {
const {email, password} = req.body;
if (!email || !password) {
    res.json({
        status: "error",
        code:  400,
        data:{
            message: "Bad Request"
        }
    });
    return;
} 
    const user = await findUser(email);
if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Incorrect login or password',
      data: 'Unauthorized',
    })
  }
  const payload = {
    id: user.id,
    email: user.email,
  };

  console.log('secret', secret)

  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  res.json({
    status: 'success',
    code: 200,
    data: {
      token
    },
  });
  user.setToken(token);
  await user.save();
}
  
const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (!user || err) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
          data: 'Unauthorized',
        })
      }
      req.user = user
      next()
    })(req, res, next)
  };

  const authUser = async (req,res) => {
    const { email } = req.user;
    res.json({
      status: 'success',
      code: 200,
      data: {
        message: `Authorization was successful: ${email}`,
      },
    });


  };

  const logOut = async(req,res) => {
    console.log('logout')
    const {id} = req.body;
    console.log('id', id)
    const a = await findUserById(id);
    if(!a) {
        console.log("error")
        return res.status(401).json({
            status: 'error',
            code: 401,
            data: {
                message:  "Not authorized",
            }
    })
    }
    a.deleteToken();
    await a.save();
    return res.status(204).json({
        status: 'success',
        code: 204,
        message:  "No Content",
})


  };

  const current = async (req,res) => {
const {id } = req.body;
const user = await currentUser (id);
if (user) {
    return res.status(200).json ({
    status: 'success',
    code:200,
    message: {
        email: user.email,
        subscription: user.subscription
    }
})
} else {
    return res.status(401).json ({
        status: 'error',
        code:401,
        message: "Unauthorized"
    })
}

  }
  module.exports = {createUser, loginUser, auth, authUser, logOut,current}