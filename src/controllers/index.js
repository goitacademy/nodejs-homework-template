
//*     controllers/contacts

// const getAll = require("./contacts/getAll");
// const getById = require("./contacts/getById");
// const addById = require("./contacts/addById");
// const updateById = require("./contacts/updateById");
// const updateFavorite = require("./contacts/updateFavorite");
// const deleteById = require("./contacts/deleteById");

//*     controllers/auth
// const signup = require("./auth/signup");
const auth = require("./auth");
const contacts = require("./contacts");


module.exports ={
  // getAll,
  // getById,
  // addById,
  // updateById,
  // updateFavorite,
  // deleteById,
  auth,
  contacts 
};
