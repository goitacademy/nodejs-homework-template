const Contact = require('../../models/contact');

const create = async (userId, body) => {
    const result = await Contact.create({...body, owner:userId});
    return result;
}

const getAll = async (userId) => {
    const result = await Contact.find({owner: userId});
    return result;
}

const getById = async (userId,id) => {
    const result = await Contact.findOne({_id:id, owner:userId});
    return result;
}

const remove = async (userId, id) => {
    const result = await Contact.findOneAndRemove({_id:id, owner:userId});
    return result;
}

const update = async (userId, id,body) => {
    const result = await Contact.findOneAndUpdate({_id:id, owner:userId},{...body},{new:true,runValidators:true});
    return result;
}

const updateStatus = async (userId, id, body) => {
    const result = await Contact.findOneAndUpdate({_id:id, owner:userId},{...body},{new:true,runValidators:true});
    return result;
}


module.exports = {create, getAll, getById, remove, update, updateStatus}