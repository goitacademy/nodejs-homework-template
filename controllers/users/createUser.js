const express = require('express')
const {addUser} = require('../../models/users')
const Users = require('../../schemas/users')
const gravatar = require('gravatar')

const createUser = async (req, res) => {
    const {email, password } = req.body;
    const httpUrl = gravatar.url(email)
    console.log(email, password)
    console.log(httpUrl)
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

module.exports = {createUser}