import { HttpError } from "../helpers/index.js";

// перевірка чи дані які додають новий контакт є, чи відправляється пуста форма = пустий масив
const isEmptyBody =  async(req, res, next)=>{
    const keys = Object.keys(req.body)
    if(!keys.length){ // довжина масиву пуста
        return next(HttpError(400, 'Body must have full fields'))
    }
    next();
}
export default isEmptyBody;

