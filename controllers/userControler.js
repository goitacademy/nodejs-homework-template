const multer = require('multer');
const pathFn = require('path');
const uuid = require('uuid').v4;
const fse = require('fs-extra');
const Jimp = require("jimp");

const User = require('../models/userModel')

const {catchAsync} = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { userValidator } = require('../utils/joiValidator')
const { bcryptPassword, checkBcryptPass } = require('../services/bcryptPassword')
const { createToken } = require('../services/jwtToken')
const { protect } = require('../middlewares/userMiddlewares')

exports.userSingUp = catchAsync(async (req, res) => {

    const {error, value} = await userValidator(req.body)
    if(error) throw new AppError(400, 'invalid data');


    const emailIsDb = await User.exists({email: value.email})
    if(emailIsDb) throw new AppError(409, 'Email in use');
 
    const hashPass = await bcryptPassword(value.password)
   
        const newUser = await User.create({...value, password: hashPass})
        newUser.password = undefined

        const token = createToken(newUser.id)

        res.status(201).json({
            user: newUser,
            token
        })
})

exports.userLogin = catchAsync( async (req, res) => {

    const {error, value} = await userValidator(req.body)
    if(error) throw new AppError(400, 'invalid data');


        const loginUser = await User.findOne({ email: value.email }).select('+password');
        if(!loginUser) throw new AppError(400, 'invalid data')

        const truePassword = await checkBcryptPass(value.password, loginUser.password)
        if(!truePassword) throw new AppError(400, 'ivalid data')
        
        loginUser.password = undefined

        const token = await createToken(loginUser.id)
        console.log(token)

        res.status(200).json({
            user: loginUser,
            token
        })
})

exports.logOut = catchAsync( async (req, res) => {
    res.sendStatus(204)
})

exports.currentUser = catchAsync(async(req, res) => {
    const {email, subscription} = req.user
    res.status(200).json({
        email,
        subscription
    })
})

exports.getUserById = (id) => User.findById(id)

exports.addAvatar = catchAsync(async(req, res) => {

    const {user, file, body} = req;
    
    if (file) {

        user.avatarURL = await newImageUser()
        
        async function newImageUser () {
            const {filename, path} = file
            const {id} = user
            const newPath =  pathFn.join(process.cwd(), 'public', 'avatars', id);


            await fse.emptyDir(newPath)
            await Jimp.read(path)
                .then((avatar) => {
                    return avatar
                        .cover(500, 500) // resize
                        .quality(90) // set JPEG quality
                        .writeAsync(pathFn.join(newPath, filename)); // save

                }).catch((err) => {
                    console.error(err);
                });

            return pathFn.join('avatars', id, filename)
            
        }
    }

    Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key]
    })

    const updatedUser = await user.save();

    res.status(200).json({
        "avatarURL": user.avatarURL
    });
})