import express from "express";
import { authorization, isEmptyBody } from '../../middlewares/index.js'
import authControlers from "../../controllers/auth-controlers.js";
import { validateBodyReq } from '../../decorators/index.js'
import { singInSchema, singUpSchema } from "../../models/Model-user.js";


const authRouter = express.Router()
const ValidatorSingup = validateBodyReq(singUpSchema)
const ValidatorSingin = validateBodyReq(singInSchema)

authRouter.post('/singup', isEmptyBody, ValidatorSingup, authControlers.singup);
authRouter.post('/singin', isEmptyBody, ValidatorSingin, authControlers.singin);
authRouter.post('/logout', authorization, authControlers.logout);
authRouter.get('/current', authorization, authControlers.current);





export default authRouter;