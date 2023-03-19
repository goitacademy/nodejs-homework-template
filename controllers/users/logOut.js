const { findUserById} = require('../../models/users')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Users = require('../../schemas/users')



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
  
  module.exports = {logOut}