const serialize = {
    /**
     * transformes data to JSON and formats it into standart view
     * @param {any} data any data you want to be represented as JSON
     * @param {number} format configure the JSON view. By default value equals to two
     * @returns {JSON | Error} JSON or error
     */
    toJSON: (data, format = 2) => {
        try {
            const json = JSON.stringify(data, null, format);
            return json;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    /**
     * turns JSON to valid JS data types
     * @param {string} data any data in JSON format
     * @returns {any | Error} successfully parsed data or Error
     */
    parse: (data) => {
        try {
            const parsedData = JSON.parse(data);
            return parsedData;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = {
    serialize
}