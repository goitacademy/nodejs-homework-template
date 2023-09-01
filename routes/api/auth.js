import  express  from "express"; 
import { validateUser, schemas } from "../../helpers/validateUser.js";
import { auth } from "../../controllers/index.js";
import authenticate from "../../middlewares/authenticate.js";

const router = new express.Router();

router.post('/register', validateUser(schemas.registerSchema), auth.createUser);
router.post('/login', validateUser(schemas.loginSchema), auth.login);
router.post('/logout', authenticate, auth.logout);
router.get('/current', authenticate, auth.getCurrent);

export default router;