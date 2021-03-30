const jwt = require('jsonwebtoken');

const User = require('../schemas/userSchema')

const findById = async (id) => {
  try {
    return User.findOne({_id: id})
  } 
  catch (error){
    throw error;
  }

}
const findByEmail = async (email) => {
    try {
      return User.findOne({email})
    } 
    catch (error){
      throw error;
    }
  }

  const create = async (body) => {
    try {
      const user = new User(body)
      return user.save()
    } 
    catch (error){
      throw error;
    }
  
  }
  const updateToken = async (id, token) => {
    try {
      return User.updateOne({_id: id}, {token})
    } 
    catch (error){
      throw error;
    }
  
  }

  module.exports = {
    findById,
    findByEmail,
    create,
    updateToken
  }