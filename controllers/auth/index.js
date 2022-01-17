import { HttpCode } from '../../lib/constants'
import authService from '../../services/auth'
import { UploadFileService, LocalFileStorage } from '../../services/file-storage'


// export const authService = new AuthService()

const signup = async (req, res, next) =>{
    try{
    const { email } = req.body
    const isUserExist = await authService.isUserExist(email)
    if(isUserExist) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error', 
            code: HttpCode.CONFLICT,
            message: "Email in use",
        })
    }
    const data = await authService.create(req.body)
    res
    .status(HttpCode.CREATED)
    .json({status: 'success', code: HttpCode.CREATED, data: data})
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) =>{
    const { email, password } = req.body
    const user = await authService.getUser(email, password)
    if(!user) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error', 
            code: HttpCode.UNAUTHORIZED,
            message: "Email or password is wrong"
        })
    }
    const token = authService.getToken(user)
    await authService.setToken(user.id, token)

    res.status(HttpCode.OK)
    .json({status: 'success', 
    code: HttpCode.OK, 
    data: { 
        token: token, 
        user: {email: user.email, subscription: user.subscription}
    }
})
}

const logout = async (req, res, next) => {
    await authService.setToken(req.user.id, null) 
    res
    .status(HttpCode.NO_CONTENT)
    .json({status: 'success', code: HttpCode.OK, data:{}
    }) 
}

const current = async(req, res, next)=>{
    const {email, subscription} = req.user;
    res.status(HttpCode.OK)
    .json({status: 'success', 
    code: HttpCode.OK, 
    data: { 
        email: email, 
        subscription: subscription}
    })

}

const updateUser = async(req,res,next) => {
    const {subscription} = req.body
    const{id, email}= req.user
    if(
        subscription ==='starter'||
        subscription ==='pro'||
        subscription==='business'
    ){
        authService.setSubscription(id, subscription)
        return res.status(HttpCode.OK).json({
        status: 'success', 
        code: HttpCode.OK,
        message: 'Subscription is updated successfully', 
        data: {
            email: email, 
            subscription: subscription
        }
        })
    }
    else{
        res.status(HttpCode.BAD_REQUEST).json({status: 'error', code: HttpCode.BAD_REQUEST, message: "Something went wrong"})
    
}
}

const uploadAvatar = async(req,res,next) => {
    const uploadService = new UploadFileService(
        LocalFileStorage,
        req.file,
        req.user
    )

    const avatarUrl = await uploadService.updateAvatar()
    
    res
    .status(HttpCode.OK)
    .json({status:'success', code: HttpCode.OK, data:{ avatarUrl }})
}



export { signup, login, logout, current, updateUser, uploadAvatar }