const getAll = require("./getAll");
const updateProducts = require("./updateContacts");

const removeById = async(id)=> {
    const contacts = await getAll();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    // const [removeProduct] = products.splice(idx, 1);
    // await updateProducts(products);
    // return removeProduct
    const newContacts = contacts.filter((_, index) => index !== idx);
    await updateProducts(newContacts);
    return contacts[idx];
}

module.exports = removeById;