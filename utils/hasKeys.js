/**
 * checks whether object contains passed [keys]
 * @param {{[key: string]: any}} obj valid JS object
 * @param {Array<string>} keys array of keys that supposed to be present on object
 * @return { boolean }
*/
const hasKeys = (obj, keys) => {
    if(!(obj instanceof Object)) throw new Error('First parameter must be an object');
    if(!(keys instanceof Array)) throw new Error('Second parameter must be an array');

    const checked = keys.filter(key => !(key in obj));
    
    return {
        allMatch: !checked.length,
        missedKeys: checked
    };
}

module.exports = {
    hasKeys
}