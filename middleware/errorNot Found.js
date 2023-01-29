
const errorNotFound = (contactId, res, result, next) => res.status(404).json({
    status: "error",
    code: 404,
    massage: `Contacts with id = ${contactId} not found`
});


// console.log(errorNotFound);

module.exports = { errorNotFound };
