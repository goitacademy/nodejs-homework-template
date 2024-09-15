import Contact from "../models/contact.js";

const getAll = async (userId, query) => {
  const favorite = query || ["false", "true"];
  return Contact.find({ owner: userId, favorite: favorite }).lean();
};

const getOne = async (id, userId) => {
  return Contact.findById({ _id: id, owner: userId }).lean();
};

const create = async (userId, data) => {
  return Contact.create({ owner: userId, ...data });
};

const update = async (id, userId, data) => {
  return Contact.findByIdAndUpdate({ _id: id, owner: userId }, data, {
    runValidators: true,
    new: true,
  });
};

const updateFavorite = async (id, userId, favorite) => {
  return Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { favorite: favorite },
    {
      runValidators: true,
      new: true,
    }
  );
};

const remove = async (id, userId) => {
  return Contact.findByIdAndDelete({ _id: id, owner: userId });
};

const service = {
  getAll,
  getOne,
  create,
  update,
  updateFavorite,
  remove,
};

export default service;
