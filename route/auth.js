const router = require('express').Router();
const user = require('../models/user');

// VALIDATION
const Joi = require('@hapi/joi');
//const validate = require('../models/user');
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

router.post('/register',async(req,res)=>{
    /*
        Lets validation the data before we user 
        if you using @hapi/joi under 17.x version change valid method with validate method
    */
        const validation = schema.validate(req.body);
        res.send(validation);
    try{
        
    }catch(err){
        res.send({massage: "error"})
        
    }
    // const User = new user({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    // 
    // try {
    //     const savedUser = await User.save();
    //     res.send(savedUser)
    //     
    // } catch (err){
    //     res.status(400).send(err)
    // }
});

router.post('/login')
module.exports = router;