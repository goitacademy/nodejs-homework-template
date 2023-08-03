import { HttpError } from '../../helpers/index.js';
import Contact from '../../models/contact.js';

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Contact with id=${contactId} not found`)
    }
    res.json(result);
};

export default updateById;