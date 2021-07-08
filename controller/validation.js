/*
    Lets validation the data before we user ,
    if you using @hapi/joi 16.x and last version Joi.validate is not fuction
    you can use joi.object({data valide}) and in validation method you can use your schema.validate 
*/
const Joi = require('@hapi/joi');

const registerValidation = data => {    
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
};

const loginValidation = data => {    
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;