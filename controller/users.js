const {User} = require('../service/schemas/users')
const {hash, compare} = require('./bcrypt')
const jwt = require('jsonwebtoken');
const process  = require('process');
const gravatar = require('gravatar');

const addUserController = async (body, res) => {
    try{
    const {password, email, subscription} = body;
    const userFind = await User.findOne({ email });

    if (userFind) 
    {return res.status(409).json({message: 'Email in use'})}

    if(!password) 
    {return res.status(400).json({ message: "Not valid email" })}

    if(!email)
    {return res.status(400).json({ message: "Not valid email" })}


    const user = await User({  email, subscription });
    const hashPass = await hash(password)
    user.password = hashPass
    const avatar = gravatar.url(email, {protocol: 'https', s: '100'})
    user.avatarURL = avatar
    await user.save();
    return res.status(201).json({
        user: {
            email,
            subscription
        }
    })

    }catch(err){
        res.status(400).json({ message: err.message })
    }
}

const findUserController = async (body,res) => {
    try{
    const {password, email} = body

    if(!password) 
    {return res.status(400).json({ message: "Not valid email" })}

    if(!email)
    {return res.status(400).json({ message: "Not valid email" })}

    const exists = await User.exists({ email })

    if (!exists)
    {return res.status(401).json({ message: "Email or password is wrong" })}

    const user = await User.findOne({email}).lean()
    
    const passed = await compare(password, user.password)

    if (!passed)
    {return res.status(401).json({ message: "Email or password is wrong" })}

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' });

    const updatedUser = await User.findOneAndUpdate(user._id, {token}, { new: true })

    return res.status(200).json({
        token: updatedUser.token,
        user: {
            email: updatedUser.email,
            subscription: updatedUser.subscription
        }
    })

    }catch(err){
        res.status(400).json({ message: err.message })
    }
}

const getAllUsersController = async(req, res) => {
    try{
     const users = await User.find({}, '-password').lean()
     return res.status(200).json({
        users
     })
    }catch(err){
        res.status(400).json({ message: err.message })
    }
}

const logoutUsersController = async(req, res) => {
    try{

     const userNullToken = await User.findOneAndUpdate(req.user._id, {token: null}, { new: true } )

     if(!userNullToken){return res.status(401).json({message: "Not authorized"})}

        return res.status(204).json({message: "No Content"})

    }catch(err){
        res.status(400).json({ message: err.message })
    }
}

const getCurrentUserController = async(req,res) => {
    try{
    const currentUser = req.user
    if(!currentUser){ return res.status(401).json({message: "Not authorized"})}
    res.status(200).json({
        email: currentUser.email,
        subscription: currentUser.subscription
    })

    }catch(err){
    res.status(400).json({ message: err.message })  
    }
}

const patchUserSubscription = async(req, res) => {
    try{
     const {subscription} = req.body

     if(!subscription){return res.status(400).json({ message: 'Not subscription' })}
     
     const checkSubscription =
     subscription==="starter" || subscription==="pro"  || subscription==="business" ? subscription : null

     if(!checkSubscription){return res.status(400).json({ message: 'Not valid subscription' })}
     
     const userSubscription = await User.findOneAndUpdate(req.user._id, {subscription: checkSubscription}, { new: true } )
     
     if(!userSubscription){res.status(400).json({ message: "Not subscription" })}

     return res.status(200).json({
        user: userSubscription
    })
    }catch(err){
    res.status(400).json({ message: err.message })
    }
}

const patchUserAvatarController = async(req,res) => {
    try{
        const avatarPath = req.file.path

        if(!avatarPath){
            res.status(401).json({ message: 'Not authorized' })
        }

        res.json({avatarURL: avatarPath})
    }catch(err){
        res.status(400).json({ message: err.message })
    }

}

module.exports = {
    addUserController,
    findUserController,
    getAllUsersController,
    logoutUsersController,
    getCurrentUserController,
    patchUserSubscription,
    patchUserAvatarController
  }