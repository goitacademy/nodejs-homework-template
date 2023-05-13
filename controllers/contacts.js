const {Contact} = require("../models/contact");
const { HttpError,ctrlWrapper } = require("../helpers/index");


const listContacts = async (req, res) => {

    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const { favorite } = req.query;                                                             
    const skip = (page - 1) * limit;                                                                      
    if (!favorite) {
		const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit });
		res.json(contacts);
    }
    
	if (favorite) {
		const boolValue = favorite === "true";
		const contacts = await Contact.find(
			{ owner, favorite: { $eq: boolValue } },
			"-createdAt -updatedAt",
			{
				skip,
				limit,
			},
		);
		res.json(contacts);
	}
};
    

const getContactById = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    
    if (!result) {
        throw HttpError(404, "Contact not found");
    }

    res.json(result);
    
};

const addContact = async (req, res) => {

    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    
    res.status(201).json(result);
   
};

const updateContact = async (req, res) => {
   
    const { contactId } = req.params;
    
    const result = await Contact.findByIdAndUpdate(contactId, req.body,
        {
            writeConcern: {
                w: "majority",
            },
        },
        {
            new: true
        }
    );

    if (!result) {
        throw HttpError(404, "Contact not found");
    }

    res.json(result);
   
};

const updateFavorite = async (req, res) => {
   
    const { contactId } = req.params;
    
    const result = await Contact.findByIdAndUpdate(contactId, req.body,
        {
            writeConcern: {
                w: "majority",
            },
        },
        {
            new: true
        }
    );

    if (!result) {
        throw HttpError(404, "Contact not found");  
    }

    res.json(result);
   
}; 

const removeContact = async (req, res) => {
   
    const { contactId } = req.params;
    
    const result = await Contact.findByIdAndRemove(contactId,
        {
            writeConcern: {
                w: "majority",
            },
        }
    );

    if (!result) {
        throw HttpError(404, "Contact not found");
    }
    res.json({
        message: "Delete success"
    });
   
};


module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
    removeContact: ctrlWrapper(removeContact),
};