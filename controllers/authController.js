const {User} = require('../models/auth.js')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env;

class AuthController {
    async signup (req, res, next) {
        try{
            const {email,password} = req.body
            const existUser = await User.findOne({email});
            if(existUser) {
                return res
                    .status(409)
                    .json({ status: "Conflict",
                        code: 409,
                        message: `User ${email} already exist`
                    });
            }
            const newUser = new User({...req.body, password})
            newUser.setPassword(password)
            newUser.save();
            // const newUser = await user.create({...req.body, "password": hashpwd});
            return res
                .status(201)
                .json({ status: "created",
                    code: 201,
                    payload: { user: {'email': newUser.email ,'subscription' : newUser.subscription } } });
        }catch(error){
            return res
                .status(400)
                .json({ status: "error", code: 400, message: "Not Found" });
        }
    }
    
    async signin(req, res, next){
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email});
            // const existUser = new User({...req.body, password})
            if(!user || !user.comparePassword(password)){
                return res
                    .status(401)
                    .json({ status: "Unauthorized",
                        code: 401,
                        message: "Email or password is wrong"
                    });
            }
            const payload = {
                id: user._id
            }
            const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
            await User.findByIdAndUpdate(user._id, {token})
            res.json({
                status: "success",
                code: 200,
                data: {
                    token
                }
            })
        }catch (e) {
            return res
                .status(401)
                .json({ status: "Unauthorized",
                    code: 401,
                    message: "Email or password is wrong"
                });
        }
    }

    async logout(req, res, next){
        try{
            const {_id} = req.user;

            await User.findByIdAndUpdate(_id, {token: null});
            res.status(204).json({message: 'No content'})
        }catch (e) {
            return res
                .status(404)
                .json({ status: "error", code: 404, message: "Not Found" });
        }
    }
}

module.exports = new AuthController;