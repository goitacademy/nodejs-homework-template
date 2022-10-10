const {Contact} = require("../../models/contacts")

const updateFavorite = async(req, res)=> {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result){
        return res.status(400).json({
            message: "Missing field favorite",
          });
    }

    res.status(201).json(result)
}

module.exports = updateFavorite;