const wrapperFactory =
    (wrapperFunc, ...elements) => 
        elements.reduce((acc, element) =>
            ({ ...acc, [element?.name]: wrapperFunc(element) }), {})

module.exports = {
    wrapperFactory
}