import Contact from "../../models/contact-model.js";
import { ctrlWrapper } from "../../decorators/index.js";
import {HttpError} from "../../helpers/index.js";


const deleteById = async (req, res) => {
       
    const {id} = req.params; 
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
    }
          
    res.json({
    message: "Delete success"
     })
    };

    export default ctrlWrapper(deleteById);