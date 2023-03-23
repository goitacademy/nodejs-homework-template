
const validationAddContact = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: `missing required ${error.details[0].context.key} field`
            });

        } else {
            next()
        }
    }
};


const validationUpDateContact = (schema) => {
    return (req, res, next) => {
        if (!Object.keys(req.body).length) {
            res.status("400").json({message: "missing fields"});
            return;
        }
        const {error} = schema.validate(req.body);

        if (error) {
            return res.status(400).json({message: error.details});

        } else {
            next()
        }
    };
};

const validationUpStatusContact = (schema) => {
    return (req, res, next) => {
        if (!req.body.favorite) {
            res.status(400).json({message: "missing field favorite"});
            return;
        }
        const {error} = schema.validate(req.body);

        if (error) {
            return res.status(400).json({message: `missing required ${error.details[0].context.key} field`});

        } else {
            next()
        }
    }
};


module.exports = {
    validationAddContact,
    validationUpDateContact,
    validationUpStatusContact

};
