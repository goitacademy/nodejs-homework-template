const { createUser, loginUser, getUserById } = require("../services/usersServices");

const registerUser =  async (req, res) => {
    console.log(req.body)
    try {
      
      const {user, token} = await createUser(req.body);
      res.status(201).json({ 
        message: 'New user was registered',
        user,
        token })
    } catch {
      res.status(402).json({
        message: "Ooops, something went wrong",
      })
    }
    
}

const loggedUser = async(req, res) => {
    try {
      
        const {user, token} = await loginUser(req.body);
        res.status(200).json({ 
          message: 'User successfully logged in',
          user,
          token })
      } catch (error) {
        res.status(400).json({
          message: "Ooops, something went wrong",
        })
      }
}

const logoutUser = async(req, res) => {
    console.log(req.user)
    try {
        const {_id} = req.user;
        await getUserById(_id);
      
        res.status(204)
    } catch (error) {
          res.status(400).json({
            message: "Ooops, something went wrong",
          })
    }     
}

const getCurrentUser = async(req, res) => {
    const {email} = req.user;
    res.status(200).json({
            message: "Success",
            email
        })
    
}
  
  module.exports = {
    registerUser,
    loggedUser,
    logoutUser,
    getCurrentUser
  }