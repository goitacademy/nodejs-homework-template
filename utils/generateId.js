/**
 * helper function creates new contact id based on the id of the last element in collection.
 * Fn accepts an array of contacts, gets the last element in collection,
 * extracts it's id value, increments the value by one. For example, prevId = 10 => nextId = prevId + 1;
 * @param {Array<Contact>} arr array of contacts 
 * @returns {string | Error} id based on prev element's id increased by one
 */
 function generateId(arr) {
    const isArray = Array.isArray(arr);
    
    if(!isArray) throw new Error('Passed argument must be a type of Array');

    const lastElementIndex = arr.length - 1;
    const [ lastElement ] = arr.slice(lastElementIndex);

    return String(+lastElement?.id + 1);
}

module.exports = {
    generateId
}