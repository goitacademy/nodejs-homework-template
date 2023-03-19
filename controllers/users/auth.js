const passportJwt = require('../../config/passportJwt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const express = require('express')


require('dotenv').config()
const secret = process.env.JWT_SECRET

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
  module.exports = {auth}