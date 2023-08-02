import { HttpError } from '../../helpers/index.js';
import Contact from '../../models/contact.js';

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.status(200).json({ message: "Contact deleted" })
};

export default deleteById;