import { HttpCode } from "../../lib/constants"


const uploadAvatar = async(req,res,next) => {
    res.status(HttpCode.OK)
    .json({status:'success', code: HttpCode.OK, message: 'Success!'})
}

export {uploadAvatar}