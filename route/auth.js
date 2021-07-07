const router = require('express').Router();
const user = require('../models/user');

// VALIDATION
const joi = require('@hapi/joi');
const schema = {
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required()
}

router.post('/register',async(req,res)=>{
    const User = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    try {
        const savedUser = await User.save();
        res.send(savedUser)
        
    } catch (err){
        res.status(400).send(err)
    }
})

router.post('/login')
module.exports = router;