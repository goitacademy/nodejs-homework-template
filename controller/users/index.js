import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';
import {LocalFileStorage, UploadFileService, CloudFileStorage} from '../../service/file-storage/index.js'
import repositoryUsers from '../../repository/users.js'
import {EmailService, SenderSendGrid} from '../../routes/API/email/index.js'

const agregation = async (req, res, next) =>{
    const {id} = req.params;
    const data = await repositoryContacts.getStatisticContacts(id)
    if (data) {
        return res.status(httpCode.OK)
        .json({status: 'success', code: httpCode.OK, data});

    }
    res.status(httpCode.NOT_FOUND)
    .json({message: `not found contact `})
};

const uploadAvatar = async(req, res, next) =>{
    const uploadServis = new UploadFileService(LocalFileStorage, req.file, req.user)
     const avatarUrl = await uploadServis.updateAvatar();


    res.status(httpCode.OK).json({
        status: 'success',
        code: httpCode.OK,
        message: 'Success!!!',
        data: {avatarUrl}

    })
}

const verifyUser = async(req, res, next) =>{
   const  verfyToken = req.params.token
    const userForToken = await repositoryUsers.findByvrifyToken(verfyToken)

if (userForToken) {
    await repositoryUsers.updateverify(userForToken.id, true)
   return res.status(httpCode.OK).json({
        status: 'success',
        code: httpCode.OK,
        message: 'Success!!!',
        data: {message: 'success!'}

    })
}
    res.status(httpCode.BAD_REQUEST).json({
        status: 'success',
        code: httpCode.BAD_REQUEST,
        message: 'invalid token',
        data: { message: 'Success!' }

    })
};

const repeatEmailForVerifyUser = async(req, res, next) =>{
    const  verifyEmail = req.body.email
    const userForemail = await repositoryUsers.findByEmail(verifyEmail)     
 if (userForemail) {
     await repositoryUsers.updateVerifyToken(userForemail.id, true)
     const updatedUser = await repositoryUsers.findByEmail(verifyEmail)

      const emailService = new EmailService(
        process.env.NODE_ENV,
        new SenderSendGrid()
    );  
    const isSend = await emailService.sendVeryfyEmail(verifyEmail, userForemail.name, updatedUser.verifyTokenEmail)
    delete updatedUser.verifyTokenEmail
    if (isSend) {
 
        return res.status(httpCode.OK).json({
            status: 'success',
            code: httpCode.OK,
            message: 'Success!!!',
            data: {...userForemail.data, isSendEmailVerify: isSend}    
        })
    }  

 }
     res.status(httpCode.BAD_REQUEST).json({
         status: 'success',
         code: httpCode.BAD_REQUEST,
         message: 'invalid token',
         data: { message: 'invalid token' }
 
     })
}

export {agregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser}

