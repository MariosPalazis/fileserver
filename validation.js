//VALIDATION
const joi = require('@hapi/joi');

// validation
const registerValidation = (data) =>{
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(8),
    });

    return schema.validate(data);
}

const loginValidation = (data) =>{
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required()
    });

    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
