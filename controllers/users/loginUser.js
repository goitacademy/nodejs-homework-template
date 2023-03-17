const jwt = require('jsonwebtoken')
const express = require('express')
const { findUser} = require('../../models/users')
const passport = require('passport')


require('dotenv').config()
const secret = process.env.JWT_SECRET


const loginUser = async (req, res) => {
  const {email, password} = req.body;
    if (!email || !password) {
      console.log('aaaaa');
        return res.json({
            status: "error",
            code:  400,
            data:{
                message: "Bad Request"
            }
        });
    } 
    const user = await findUser(email);
    console.log(email === undefined,  password===undefined);
    console.log(user);
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

      user.setToken(token);
      await user.save();
      return res.json({
        status: 'success',
        code: 200,
        data: {
          token
        },
      });
    };

    
module.exports = {loginUser}