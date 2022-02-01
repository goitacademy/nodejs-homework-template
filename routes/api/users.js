/* eslint-disable no-unused-vars */
const express = require('express');
const { User } = require('../../model')
const Jimp = require('jimp');
const router = express.Router();
const { authenticate,upload } = require('../../middlewares');
const path =require('path');
const fs = require('fs/promises');
const { NotFound, BadRequest } = require('http-errors');
const avatarsDir = path.join(__dirname,'../../',"public",'avatars')
const {sendEmail }= require('../../helpers/sendEmail')
const {SITE_NAME}= process.env;

router.get('/current', authenticate, async (req, res) => {
    const { name, email } = req.user;
    res.json({
        name, email
    })
});

router.get('/logout', authenticate, async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate({ token: null });
    res.status(204).send();
});

router.patch('/avatars',authenticate,upload.single('avatar'), async(req,res)=>{
    const {path:tempUpload,filename }= req.file ;
    const [extension]=filename.split('.').reverse();
    const newFileName = `${req.user._id}.${extension}`;
    const fileUpload= path.join(avatarsDir,newFileName);
    await fs.rename(tempUpload,fileUpload);
    const avatarUrl=path.join('avatars',newFileName);
    try {
        const avatarToResize = await Jimp.read(fileUpload);
        avatarToResize.resize(250, 250);
        avatarToResize.write(fileUpload);
      } catch (error) {
        console.log(error);
        throw new Error('Error cropping avatar');
      }
    await User.findByIdAndUpdate(req.user._id,{avatarUrl},{new:true});
    res.json({avatarUrl})
})


router.get('/verify/:verificationToken', async(req,res,next)=>{
    try {
        const {verificationToken}=req.params;
        const user=await User.findOne({verificationToken});
        if(!user){
            throw new NotFound();
        }
        await User.findByIdAndUpdate(user._id,{verificationToken:null, varify:true})
        res.json({
            message:'Verification successful'
        })
    } catch (error) {
        next(error)
    }
})
router.post('/verify', async (req,res,next)=>{
    try {
        const {email}= req.body;
        if(!email){
            throw new BadRequest('missing required field email')
        }
        const user= await User.findOne({email});
        if (!user){
            throw new NotFound ('User not find')
        }
        if(user.verify){
            throw new BadRequest("Verification has already been passed")
        }
        const {verificationToken}= user;
        const data = {
            to: email,
            subject: 'Confirm your email',
            html: `<p>Thank you for joining our service.</p>
                    <hr/>
                    <br/>
                    <p>Please <a target="_blank" href="${SITE_NAME}/api/users/verify/${verificationToken}">Click here to verify your email address</a>.</p>`
          };
          await sendEmail(data)
          res.json({message:'Verification email sent'})
    } catch (error) {
       next(error) 
    }
})
module.exports = router;