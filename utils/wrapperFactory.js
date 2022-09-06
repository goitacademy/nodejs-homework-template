const wrapperFactory = (wrapperFunc, ...elements) => 
    elements.reduce((acc, element) => {
        acc[element?.name] = wrapperFunc(element);
        return acc;
    }, {})

module.exports = {
    wrapperFactory
}