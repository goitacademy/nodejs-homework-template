const {User} = require('../models/auth')
const path = require('path')
const fs = require('fs/promises')

class UsersController {
    async verifyEmail(req, res) {
        const {verificationToken} = req.params;
        console.log(verificationToken)
        const user = await User.findOne({verificationToken});
        if (!user) {
            res.json({
                status: 'error',
                code: 404,
                message: 'User not found',
            });
        }
        await User.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: null,
        });
        res.json({
            message: 'Verification successful',
        });
    }

    async getCurrent(req, res){
        const {email, subscription} = req.user
        res.json({
            status: "success",
            code: 200,
            data: {
                user: {
                    email,
                    subscription
                }
            }
        })
    }

    async patchUser(req, res){
        if(!req.query){
            return res.status(400).json({"message": "missing field subscription"})
        }
        const {email, _id} = req.user;
        const {subscription} = req.query;
        await User.findByIdAndUpdate(_id, {subscription}, {new:true})
        res.json({
            status: "success",
            code: 200,
            data: {
                user: {
                    email,
                    subscription
                }
            }
        })
    }

    async updateAvatar(req, res) {
            const {path: tempUpload, originalname} = req.file
            const {_id: id} = req.user
        try{
            const resultUpload = path.join(__dirname, '../', 'public', 'avatars', originalname)
            await fs.rename(tempUpload, resultUpload)
            const avatarUrl = path.join('public', 'avatars', `${id}_${originalname}`)
            await User.findByIdAndUpdate(req.user._id, {avatarUrl})
            res.json({avatarUrl})
        }catch (e) {
            await fs.unlink(tempUpload)
            res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = new UsersController;