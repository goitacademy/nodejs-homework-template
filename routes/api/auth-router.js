import express from "express";
import { authorization, isEmptyBody } from '../../middlewares/index.js'
import authControlers from "../../controllers/auth-controlers.js";
import { validateBodyReq } from '../../decorators/index.js'
import { singInSchema, singUpSchema } from "../../models/Model-user.js";


const authRouter = express.Router();
const ValidatorSignup = validateBodyReq(signUpSchema);
const ValidatorSignin = validateBodyReq(signInSchema);

authRouter.post('/signup', isEmptyBody, ValidatorSignup, authControlers.signup);
authRouter.post('/signin', isEmptyBody, ValidatorSignin, authControlers.signin);
authRouter.post('/logout', authorization, authControlers.logout);
authRouter.get('/current', authorization, authControlers.current);





export default authRouter;