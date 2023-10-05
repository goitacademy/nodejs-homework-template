import Contact from "../../models/contact-model.js";

import {HttpError} from "../../helpers/index.js";

import {ctrlWrapper} from "../../decorators/index.js";

const getById = async (req, res) => {
    const {id} = req.params; 
    const result = await Contact.findById(id);
    if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
     };

export default ctrlWrapper(getById);