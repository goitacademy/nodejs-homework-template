const fs = require('fs/promises');
const Pet = require('../../models/pets/pets');

const listPets = async (req, res) => {
  const { _id: owner } = req.user;
    try {
        const { page = 1, limit = 20, favorite = false } = req.query;
        const skip = (page - 1) * limit;
        const panginationString = { owner }
        // !favorite ? panginationString = {owner} : panginationString = { owner , favorite };
        const petsList = await Pet.find( panginationString , "-createdAT -updatedAT", {skip, limit});  
        return res.status(200).json(petsList);   
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... ListPets'})
    }
}

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const item = await Pet.create({...req.body, owner});
    return res.status(201).json({ message: 'Pet is added', item });
  }
  catch (err) {
      console.log(err)
        res.status(405).json({ message: 'Ooops...'})
    }
}

const removePet = async (req, res) => {
    const { _id: owner } = req.user;
  try {
    const { id } = req.params;
    const item = await Pet.findByIdAndRemove(id, owner);
    const PetsList = await Pet.find();
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(200).json({ "message": "pet deleted", PetsList });
  } catch (err) {
    console.log(err)
        res.status(400).json({ message: 'Ooops...'})
    }
}

module.exports = {
    listPets,
    addPet,
    removePet
}